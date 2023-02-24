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
  getAnnouncements,
  insertAnnouncement,
  validateSession,
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
    // Parse number of announcements
    let count = req.query.count?.toString();

    if (count) {
      let ans = await getAnnouncements(parseInt(count));
      res.json({ ok: 1, data: ans });
    } else {
      let ans = await getAnnouncements();
      res.json({ ok: 1, data: ans });
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

      // let verifiedEmails = req.body.verifiedEmails;
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
