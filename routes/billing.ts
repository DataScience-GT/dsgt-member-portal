import express, { Request, Response, NextFunction } from "express";
import {
  ErrorPreset,
  StatusError,
  StatusErrorPreset,
} from "../Classes/StatusError";
import { checkBillingDetailsExists, getBillingDetails } from "../model";
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
    if (!check) {
      //billing data doesnt exist
      next(
        new StatusError(
          "Could not find payment made through this email. Try again or contact hello@datasciencegt.org for help.",
          404
        )
      );
      return;
    }
    let data = await getBillingDetails(email);
    res.json({ ok: 1, data: data });
  }
);

module.exports = router;
export default router;
