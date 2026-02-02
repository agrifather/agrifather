import express from "express";
import {
  login,
  sendOtp,
  verifyOtpRegister,
  sendForgotPasswordOtp,
  resetPasswordWithOtp,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/send-otp", sendOtp);
router.post("/verify-otp-register", verifyOtpRegister);
router.post("/forgot-password/send-otp", sendForgotPasswordOtp);
router.post("/forgot-password/reset", resetPasswordWithOtp);

export default router;