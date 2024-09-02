const nodemailer = require("nodemailer");
import { NextFunction } from "express";

export type EmailOptions = {
  to?: string;
  subject?: string;
  text?: string;
  html?: string;
  attachments?: Attachment[];
  cc?: string | string[];
  bcc?: string | string[];
  next: NextFunction;
  callback?: () => void;
};

export type Attachment = {
  filename: string;
  path: string;
  cid?: string;
};

export const sendEmail = ({
  to,
  subject,
  text,
  html,
  attachments,
  cc,
  bcc,
  next,
  callback,
}: EmailOptions) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "membership@datasciencegt.org", // Your Gmail address
      pass: "pocc lsum rneu dusu", // Your app password
    },
  });

  transporter.verify().then().catch(next);

  transporter
    .sendMail({
      from: `"DSGT" <membership@datasciencegt.org>`, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: html, // html body
      bcc: bcc,
      cc: cc,
      attachments: attachments,
    })
    .then((info: any) => {
      // console.log(`Email sent from "DSGT" <membership@datasciencegt.org>`); // sender address
      if (callback) {
        callback();
      }
    })
    .catch(next);
};
