const nodemailer = require("nodemailer");
import { NextFunction } from "express";

export type EmailOptions = {
  to?: string;
  subject?: string;
  text?: string;
  html?: string;
  attachments?: any[];
  cc?: string | string[];
  bcc?: string | string[];
  next: NextFunction;
  callback?: () => void;
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
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.SMTP_EMAIL_EMAIL,
      pass: process.env.SMTP_EMAIL_PASSWORD,
    },
  });
  // if (Array.isArray(to)) {
  //   to = to.join(", ");
  // }
  transporter.verify().then().catch(next);
  transporter
    .sendMail({
      from: `"${process.env.SMTP_EMAIL_USERNAME}" <membership@datasciencegt.org>`, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: html, // html body
      bcc: bcc,
      cc: cc,
    })
    .then((info: any) => {
      if (callback) {
        callback();
      }
    })
    .catch(next);
};
