import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import { getSessions, validateSession } from "../model";

import RateLimit from "../middleware/RateLimiting";
import {
  ErrorPreset,
  StatusError,
  StatusErrorPreset,
} from "../Classes/StatusError";

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the session api!");
});

router.get("/get", async (req: Request, res: Response, next: NextFunction) => {
  const x = await getSessions();
  res.json({ ok: 1, data: x });
  // res.json(x);
});

router.post(
  "/validate",
  RateLimit(100, 1000 * 60),
  async (req: Request, res: Response, next: NextFunction) => {
    let sessionKey = req.body.session_id;
    if (!sessionKey) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    } else {
      let x = await validateSession(sessionKey);
      if (!x) {
        next(new StatusError("Session not found", 404));
      } else {
        let session_created_at = new Date(x.created_at);
        let now = new Date();
        let dif_ms = now.getTime() - session_created_at.getTime();
        let dif_s = dif_ms / 1000;
        let dif_m = dif_s / 60;
        let dif_h = dif_m / 60;
        let timeout = process.env.SESSION_TIMEOUT_H;
        if (x.enabled && dif_h < parseFloat(timeout || "2")) {
          res.json({ ok: 1, valid: true, fname: x.fname, role: x.role });
        } else {
          res.json({ ok: 1, valid: false, fname: x.fname, role: x.role });
        }
      }
    }
  }
);

module.exports = router;
export default router;
