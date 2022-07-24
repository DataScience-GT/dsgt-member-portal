import express, { Request, Response, NextFunction } from "express";
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

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the announcement api!");
});

router.post(
  "/get",
  RateLimit(20, 1000 * 60),
  async (req: Request, res: Response, next: NextFunction) => {
    let session_id = req.body.session_id;
    if (!session_id) {
      next(new Error("Missing 1 or more required fields in body."));
      return;
    }
    //check for count
    let count = req.query.count?.toString();

    let valid = await checkSessionValid(session_id, next);
    if (valid && valid.valid) {
      if (count) {
        let anns = await getAnnouncements(parseInt(count));
        res.json({ ok: 1, data: anns });
      } else {
        let anns = await getAnnouncements();
        res.json({ ok: 1, data: anns });
      }
    } else {
      next(new Error("Session not valid."));
    }
  }
);

router.post(
  "/create",
  RateLimit(10, 1000 * 60 * 60),
  async (req: Request, res: Response, next: NextFunction) => {
    let session_id = req.body.session_id;
    let message = req.body.announcement;
    if (!session_id || !message) {
      next(new Error("Missing 1 or more required fields in body."));
      return;
    }
    let valid = await checkSessionValid(session_id, next);
    if (valid && valid.valid) {
      //check if proper perms
      if (compareUserRoles(valid.role, "moderator") >= 0) {
        //create ann announcement
        await insertAnnouncement(message, valid.user_id);
        res.json({ ok: 1 });
      } else {
        next(new Error("You do not have permission to complete this action."));
      }
    } else {
      next(new Error("Session not valid."));
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
      next(new Error("Missing 1 or more required fields in body."));
      return;
    }
    let valid = await checkSessionValid(session_id, next);
    if (valid && valid.valid) {
      //check if proper perms
      if (compareUserRoles(valid.role, "moderator") >= 0) {
        //delete announcement
        await deleteAnnouncement(announcement_id);
        res.json({ ok: 1 });
      } else {
        next(new Error("You do not have permission to complete this action."));
      }
    } else {
      next(new Error("Session not valid."));
    }
  }
);

module.exports = router;
export default router;
