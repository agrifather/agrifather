import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailOtp = async (email, otp) => {
  try {
    await resend.emails.send({
      from: "AgriFather <support@agrifather.com>",
      to: email,
      subject: "Your OTP for AgriFather",
      html: `
        <h2>AgriFather OTP Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `,
    });
  } catch (error) {
    console.error("RESEND EMAIL ERROR:", error);
    throw error;
  }
};
