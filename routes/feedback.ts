import express, { Request, Response, NextFunction } from "express";
import { ErrorPreset, StatusErrorPreset } from "../Classes/StatusError";
import { Feedback } from "../interfaces/Feedback";
import { createFeedback, getFeedback } from "../model";
import { checkSessionValid } from "../SessionManagement";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the feedback api!");
});

router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    let session_id = req.body.session_id;
    if (!session_id) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    //check session valid
    let valid = await checkSessionValid(session_id, next);
    if (!valid || !valid.valid) {
      next(new StatusErrorPreset(ErrorPreset.SessionNotValid));
      return;
    }

    //check for other inputs
    let fback: Feedback = {
      user_id: valid.user_id,
      satisfaction: req.body.satisfaction,
      action: req.body.action,
      urgency: req.body.urgency,
      content: req.body.content,
    };

    if (!fback.satisfaction || !fback.action) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    //attempt to save feedback
    await createFeedback(fback);

    res.json({ ok: 1 });
  }
);

router.post("/get", async (req: Request, res: Response, next: NextFunction) => {
  let session_id = req.body.session_id;
  if (!session_id) {
    next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
    return;
  }
  //check session valid
  let valid = await checkSessionValid(session_id, next);
  if (!valid || !valid.valid) {
    next(new StatusErrorPreset(ErrorPreset.SessionNotValid));
    return;
  }

  let feedback = await getFeedback();

  res.json({ ok: 1, data: feedback });
});

export default router;
module.exports = router;
