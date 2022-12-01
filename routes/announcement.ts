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
  ValidateSession("body", "moderator"),
  RateLimit(20, 1000 * 60 * 60),
  async (req: Request, res: Response, next: NextFunction) => {
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

      // Email
      let emailToSend = getAnnouncementEmailTemplate(message);
      // sendEmail(
      //   verifiedEmails,
      //   "DSGT Announcement",
      //   null,
      //   emailToSend,
      //   next,
      //   (info: any) => {}
      // );
      sendEmail({
        bcc: verifiedEmails,
        subject: "DSGT Announcement",
        html: emailToSend,
        next
      })
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
  }
);

router.delete(
  "/remove",
  RateLimit(10, 1000 * 60),
  async (req: Request, res: Response, next: NextFunction) => {
    let session_id = req.body.session_id;
    let announcement_id = req.body.announcement_id;
    if (!session_id || !announcement_id) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    // Attempt to delete announcement
    let valid = await checkSessionValid(session_id, next);
    if (valid && valid.valid) {
      // Check for proper permissions (compare to moderator)
      if (compareUserRoles(valid.role, "moderator") >= 0) {
        await deleteAnnouncement(announcement_id);
        res.json({ ok: 1 });
      } else {
        next(new StatusErrorPreset(ErrorPreset.NoPermission));
      }
    } else {
      next(new StatusErrorPreset(ErrorPreset.SessionNotValid));
    }
  }
);

module.exports = router;
export default router;
