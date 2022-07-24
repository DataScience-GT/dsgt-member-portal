const nodemailer = require("nodemailer");

export const sendEmail = (
  message: string,
  receiving_email: string[] | string
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

  //   transporter.verify().then(console.log).catch(console.error);
  transporter
    .sendMail({
      from: `"${process.env.SMTP_EMAIL_USERNAME}" <youremail@gmail.com>`, // sender address
      to: receiving_email, // list of receivers
      subject: "Medium @edigleyssonsilva ✔", // Subject line
      text: "There is a new article. It's about sending emails, check it out!", // plain text body
      html: "<b>There is a new article. It's about sending emails, check it out!</b>", // html body
    })
    .then((info: any) => {
      return info;
    })
    .catch(console.error);
};
