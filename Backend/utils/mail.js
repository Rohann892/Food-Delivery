import nodeMailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();

const transporter = nodeMailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});

export const sendOtpMail = async (to, otp) => {
    await transporter.sendMail({
        from: process.env.USER_EMAIL,
        to,
        subject: "Reset your Password",
        html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`
    })
}

