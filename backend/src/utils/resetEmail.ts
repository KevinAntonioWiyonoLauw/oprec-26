import dotenv from "dotenv";
import { createTransport } from 'nodemailer';
dotenv.config();
const transporter = createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.BREVO_SMTP_USER || "",
        pass: process.env.BREVO_SMTP_PASS || "",
    }
})
export const resetEmail = async(email: string, resetUrl: string) => {
    const mailOptions = {
        from: '"OPREC MAKOMTI 2025" <noreply-password-reset-oprec2025@omahti.web.id>',
        to: email,
        subject: 'Password Reset Request',
        html: `
            <h1>Password Reset Request</h1>
            <p>You requested a password reset. Click the button below to reset your password:</p>
            <a href="${resetUrl}" style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Reset Password</a>
            <p>If you did not request this, please ignore this email.</p>
            <p>This link will expire in 1 hour.</p>
        `
    };

    await transporter.sendMail(mailOptions);
}