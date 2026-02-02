import axios from "axios";

export const sendSmsOtp = async (phone, otp) => {
  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "otp",
        variables_values: otp,
        numbers: phone,
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("📨 SMS SENT:", response.data);
  } catch (error) {
    console.error(
      "❌ SMS FAILED:",
      error.response?.data || error.message
    );
    throw new Error("SMS sending failed");
  }
};
