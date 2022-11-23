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
  getAnnouncements,
  insertAnnouncement,
  validateSession,
} from "../model";
import { compareUserRoles } from "../RoleManagement";
import { checkSessionValid } from "../SessionManagement";
import { getAnnouncementEmailTemplate } from "../EmailTemplates/AnnouncementEmail";
import { sendEmail } from "../email";

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the announcement api!");
});

router.post(
  "/get",
  RateLimit(20, 1000 * 60),
  async (req: Request, res: Response, next: NextFunction) => {
    let session_id = req.body.session_id;
    if (!session_id) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    // Parse number of announcements
    let count = req.query.count?.toString();
    let valid = await checkSessionValid(session_id, next);
    if (valid && valid.valid) {
      if (count) {
        let ans = await getAnnouncements(parseInt(count));
        res.json({ ok: 1, data: ans });
      } else {
        let ans = await getAnnouncements();
        res.json({ ok: 1, data: ans });
      }
    } else {
      next(new StatusErrorPreset(ErrorPreset.SessionNotValid));
    }
  }
);

router.post(
  "/create",
  RateLimit(10, 1000 * 60 * 60),
  async (req: Request, res: Response, next: NextFunction) => {
    let session_id = req.body.session_id;
    let message = req.body.announcement;
    let sendEmailBoolean = req.body.sendEmail;
    let verifiedEmails = req.body.verifiedEmails;
    if (!session_id || !message || !sendEmailBoolean) { // Missing fields
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    // Attempt to create an announcement
    let valid = await checkSessionValid(session_id, next);
    if (valid && valid.valid) {
      // Check if proper permissions exist (compare to moderator)
      if (compareUserRoles(valid.role, "moderator") >= 0) {
        await insertAnnouncement(message, valid.user_id);
        if (sendEmailBoolean) { // Email
            let emailToSend = getAnnouncementEmailTemplate(message);
            await sendEmail(verifiedEmails, "DSGT Announcement", null, emailToSend, next);
        }
        res.json({ ok: 1 });
      } else {
        next(new StatusErrorPreset(ErrorPreset.NoPermission));
      }
    } else {
      next(new StatusErrorPreset(ErrorPreset.SessionNotValid));
    }
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
