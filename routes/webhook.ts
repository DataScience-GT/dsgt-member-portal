import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import { log, error } from "../Logger";

import { BillingDetails } from "../interfaces/Stripe";
import { checkUserEmail, createBillingDetails, updateUser } from "../model";
import { StatusError } from "../Classes/StatusError";

const stripe = require("stripe");
const endpointSecret = process.env.STRIPE_SECRET;

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    let error: Error = err as Error;
    console.log(error.message);
    next(new StatusError(`stripe webhook error: ${error.message}`, 500));
    return;
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      log(`stripe webhook: payment succeeded`);

      // get payment details & amount
      let payment_details = paymentIntent.charges.data[0]
        .billing_details as BillingDetails;
      let payment_amount = paymentIntent.charges.data[0].amount;
      payment_details.payment_amount = payment_amount;

      let accountExists = await checkUserEmail(payment_details.email, false);

      switch (payment_amount) {
        case 1500:
          if (accountExists) {
            await updateUser({ email: payment_details.email, enabled: 1 });
          }
        case 2500: 
          if (accountExists) {
            await updateUser({ email: payment_details.email, enabled: 2 });
          }
      }
      await createBillingDetails(payment_details);
      break;
    // ... handle other event types
    default:
      //   console.log(`Unhandled event type ${event.type}`);
      break;
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
});

module.exports = router;
export default router;
