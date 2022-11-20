const nodemailer = require("nodemailer");
import { NextFunction } from "express";

export const sendEmail = (
  receiving_email: string[] | string,
  subject: string,
  text: string | null,
  html: string | null,
  next: NextFunction
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.SMTP_EMAIL_EMAIL,
      pass: process.env.SMTP_EMAIL_PASSWORD,
    },
  });

  if (Array.isArray(receiving_email)) {
    receiving_email = receiving_email.join(", ");
  }

  transporter.verify().then().catch(next);
  transporter
    .sendMail({
      from: `"${process.env.SMTP_EMAIL_USERNAME}" <youremail@gmail.com>`, // sender address
      to: receiving_email, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: html, // html body
    })
    .then((info: any) => {
      return info;
    })
    .catch(next);
};
