import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import { getSessions, validateSession } from "../model";

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
  async (req: Request, res: Response, next: NextFunction) => {
    let sessionKey = req.body.session_id;
    if (!sessionKey) {
      next(new Error("Missing 1 or more required fields."));
      return;
    }
    let x = await validateSession(sessionKey);
    if (!x) {
      next(new Error("Session not found"));
    } else {
      let session_created_at = new Date(x);
      let now = new Date();
      let dif_ms = now.getTime() - session_created_at.getTime();
      let dif_s = dif_ms / 1000;
      let dif_m = dif_s / 60;
      let dif_h = dif_m / 60;
      let timeout = process.env.SESSION_TIMEOUT_H;
      if (dif_h < parseFloat(timeout || "2")) {
        res.json({ ok: 1, valid: true });
      } else {
        res.json({ ok: 1, valid: false });
      }
    }
  }
);

module.exports = router;
