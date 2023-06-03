import express, { Request, Response, NextFunction } from "express";
import {
  ErrorPreset,
  StatusError,
  StatusErrorPreset,
} from "../Classes/StatusError";
const router = express.Router();

import RateLimit from "../middleware/RateLimiting";
import {
  deleteAnnouncement,
  getAllMembersWithEmailOn,
  getAllExecMembersWithEmailOn,
  getAnnouncements,
  insertAnnouncement,
  validateSession,
  updateAnnouncementViews,
} from "../model";
import { compareUserRoles } from "../RoleManagement";
import { checkSessionValid } from "../SessionManagement";
import { getAnnouncementEmailTemplate } from "../EmailTemplates/AnnouncementEmail";
import { sendEmail } from "../email";
import ValidateSession from "../middleware/CheckSessionMiddleware";

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the announcement api!");
});

router.get(
  "/get",
  ValidateSession("query"),
  RateLimit(20, 1000 * 60),
  async (req: Request, res: Response, next: NextFunction) => {

    let count = req.query.count?.toString();
    let counts_as_view = req.query.counts_as_view?.toString();
    let counts_bool = JSON.parse(counts_as_view || 'false');
    let ans = await getAnnouncements();

    if (count) {
      ans = await getAnnouncements(parseInt(count));
    }
    res.json({ ok: 1, data: ans });

    if (counts_bool) {
      let announcementIds: number[] = [];
      for (const announcement of ans) {
        announcementIds.push(announcement.ann_id);
      }
      try {
        await updateAnnouncementViews(announcementIds);
      } catch (error) {
        // Handle error
        next(error);
      }
    }
  }
);

router.post(
  "/create",
  ValidateSession("body", "professor"),
  RateLimit(20, 1000 * 60 * 60),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let message = req.body.announcement;
      let sendToEmail = req.body.sendToEmail;

      let link_url = req.body.linkUrl;
      let link_text = req.body.linkText;

      if (!message) {
        // Missing fields
        next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
        return;
      }

      let verifiedEmails: string[] = [];

      

      if (sendToEmail) {
        verifiedEmails = await getAllMembersWithEmailOn();

        let email_msg = message;
        if (link_url && link_text) {
          email_msg += `<p><a href="${link_url}">${link_text}</a></p>`;
        } else if (link_url) {
          email_msg += `<p><a href="${link_url}">${link_url}</a></p>`;
        }
        // append who sent the email
        email_msg += `<br/><p>Sent by ${res.locals.session.fname} ${res.locals.session.lname}</p>`;

        // Email
        let emailToSend = getAnnouncementEmailTemplate(email_msg);
        // sendEmail(
        //   verifiedEmails,
        //   "DSGT Announcement",
        //   null,
        //   emailToSend,
        //   next,
        //   (info: any) => {}
        // );
        // can only bcc 100 emails at a time
        let emailsToSend = [];
        for (let i = 0; i < verifiedEmails.length; i += 100) {
          emailsToSend.push(verifiedEmails.slice(i, i + 100));
        }
        for (let i = 0; i < emailsToSend.length; i++) {
          await sendEmail({
            bcc: emailsToSend[i],
            subject: "DSGT Announcement",
            html: emailToSend,
            next,
          });
        }
        // sendEmail({
        //   bcc: verifiedEmails,
        //   subject: "DSGT Announcement",
        //   html: emailToSend,
        //   next,
        // });
      }

      //create announcements
      await insertAnnouncement(
        message,
        res.locals.session.user_id,
        sendToEmail,
        verifiedEmails && verifiedEmails.length
          ? JSON.stringify(verifiedEmails)
          : undefined,
        link_url,
        link_text
      );

      res.json({ ok: 1 });
    } catch (e) {
      next(e);
    }
  }
);

// router.post(
//   "/update",
//   ValidateSession("body"),
//   RateLimit(1000, 1000 * 60 * 60),
//   async (req: Request, res: Response, next: NextFunction) => {
//     let session_id = req.body.session_id;
//     let announcements = req.body.list_announcements;
//     if (!session_id || !announcements) {
//       // Missing list of announcements
//       next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
//       return;
//     }

//     let announcementIds: number[] = [];
//     for (const announcement of announcements) {
//       announcementIds.push(announcement.ann_id);
//     }

//     try {
//       await updateAnnouncementViews(announcementIds);
//       res.json({ ok: 1 });
//     } catch (error) {
//       // Handle error
//       next(error);
//     }
//   }
// );

router.delete(
  "/remove",
  ValidateSession("body", "professor"),
  RateLimit(10, 1000 * 60),
  async (req: Request, res: Response, next: NextFunction) => {
    let session_id = req.body.session_id;
    let announcement_id = req.body.announcement_id;
    if (!session_id || !announcement_id) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    // Attempt to delete announcement

    await deleteAnnouncement(announcement_id);
    res.json({ ok: 1 });
  }
);

module.exports = router;
export default router;
