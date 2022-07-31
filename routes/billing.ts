import express, { Request, Response, NextFunction } from "express";
import {
  ErrorPreset,
  StatusError,
  StatusErrorPreset,
} from "../Classes/StatusError";
import { checkBillingDetailsExists } from "../model";
const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the billing api");
});

//checks whether billing details exists
router.post(
  "/verify",
  async (req: Request, res: Response, next: NextFunction) => {
    let email = req.body.email;
    if (!email) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    let check = await checkBillingDetailsExists(email);
    res.json({ ok: 1, data: check });
  }
);

module.exports = router;
export default router;
