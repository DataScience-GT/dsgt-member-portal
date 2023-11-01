import express, { Request, Response, NextFunction } from "express";
import {
  ErrorPreset,
  StatusError,
  StatusErrorPreset,
} from "../Classes/StatusError";
import { BillingDetails } from "../interfaces/Stripe";
import {
  checkBillingDetailsExists,
  checkFormBootcampExists,
  checkFormProjectsExists,
  checkUserEmail,
  createBillingDetails,
  createProfBillingDetails,
  getBillingDetails,
} from "../model";
import { compareUserRoles } from "../RoleManagement";
import { checkSessionValid } from "../SessionManagement";
import { getAnnouncementEmailTemplate } from "../EmailTemplates/AnnouncementEmail";
import { getProfessorEmail } from "../EmailTemplates/ProfessorEmail";

import { Attachment, sendEmail } from "../email";
import ValidateSession from "../middleware/CheckSessionMiddleware";

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
    //check wether forms have been filled in
    let billing_details = await getBillingDetails(email);
    let account_exists = await checkUserEmail(email);
    let form_projects_exists = await checkFormProjectsExists(email);
    let form_bootcamp_exists = await checkFormBootcampExists(email);

    res.json({
      ok: 1,
      data: {
        billing_details: billing_details,
        account: account_exists,
        projects: form_projects_exists,
        bootcamp: form_bootcamp_exists,
      },
    });
  }
);

router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    let session_id = req.body.session_id;
    let user_email = req.body.user_email;
    let payment_amount = parseInt(req.body.payment_amount) ?? 1500;
    if (!(user_email && session_id)) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    user_email = user_email.toLowerCase();
    let valid = await checkSessionValid(session_id, next);
    if (valid && valid.valid) {
      //check if has enough perms
      if (compareUserRoles(valid.role, "administrator") >= 0) {
        let payment_details: BillingDetails = {
          email: user_email,
          payment_amount: payment_amount,
        };
        //add the payment data to the db
        await createBillingDetails(payment_details);
        res.json({ ok: 1 });
      } else {
        next(new StatusErrorPreset(ErrorPreset.NoPermission));
      }
    } else {
      next(new StatusErrorPreset(ErrorPreset.SessionNotValid));
    }
  }
);

router.post(
  "/prof",
  ValidateSession("body", "administrator"),
  async (req: Request, res: Response, next: NextFunction) => {
    let prof_emails: string[] = req.body.prof_emails;

    // iterate through the emails and create billing details for each
    let all_details: Set<BillingDetails> = new Set(
      prof_emails.map((x) => {
        return {
          email: x,
        };
      })
    );

    //add the payment data to the db
    await createProfBillingDetails(all_details, next);

    // let emailToSend = getAnnouncementEmailTemplate(
    //   "Please click on the following link to register for our member portal: https://member.datasciencegt.org/register?payment_status=completed"
    // );
    let emailToSend = getProfessorEmail();
    // sendEmail(prof_email, "DSGT Registration", null, emailToSend, next);
    sendEmail({
      bcc: prof_emails,
      subject: "DSGT Registration",
      html: emailToSend,
      next,
    });
    res.json({ ok: 1 });
  }
);

module.exports = router;
export default router;
