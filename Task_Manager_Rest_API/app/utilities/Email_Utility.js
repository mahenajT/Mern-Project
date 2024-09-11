import nodemailer from "nodemailer";
import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_SECURITY, EMAIL_USER,} from "../configs/configs.js";
const SendEmail = async (EmailTo, EmailText, EmailSubject) => {
  let transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_SECURITY,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });
  let mailOptions = {
    from: "Task Manager API Project <info@teamrabbil.com>",
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };
};
export default SendEmail;
