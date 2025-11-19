import dotenv from "dotenv";
import { createTransport } from "nodemailer";

dotenv.config();

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER || "",
    pass: process.env.GMAIL_APP_PASSWORD || "",
  },
});

transporter.verify((error) => {
  if (error) {
    console.error("Gmail SMTP verification failed:", error);
  } else {
    console.log("Gmail SMTP is ready to send emails");
  }
});

export const resetEmail = async (email: string, resetUrl: string) => {
  const mailOptions = {
    from: '"OPREC MAKOMTI 2026" <noreply-password-reset-oprec2026@omahti.web.id>',
    to: email,
    subject: "Password Reset Request",
    html: `
      <h1>Password Reset Request</h1>
      <p>You requested a password reset. Click the button below to reset your password:</p>
      <a href="${resetUrl}" style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
      <p>This link will expire in 1 hour.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};