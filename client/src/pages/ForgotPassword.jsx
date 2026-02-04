import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { API_BASE_URL } from "../config/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  
  // 1. Add the loading state
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true); // 2. Start loading
    try {
      await axios.post(
        `${API_BASE_URL}/auth/forgot-password/send-otp`,
        { identifier: email }
      );
      alert("OTP sent to email");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false); // 3. Stop loading
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    // No axios call here since you're verifying in the next page,
    // but we can add a slight delay or keep it instant.
    navigate("/reset-password", { state: { email, otp } });
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <h1>AgriFather</h1>
        <p>
          Empowering farmers with <br />
          <strong>knowledge & technology</strong>
        </p>
      </div>
      <div className="auth-right">
        <form className="auth-card" onSubmit={step === 1 ? sendOtp : verifyOtp}>
          <h2>Forgot Password</h2>
          <p className="auth-sub">
            {step === 1
              ? "Enter your registered email"
              : "Enter OTP sent to your email"}
          </p>

          <div className="input-group">
            <input
              type="email"
              required
              disabled={step === 2}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email Address</label>
          </div>

          {step === 2 && (
            <div className="input-group">
              <input required onChange={(e) => setOtp(e.target.value)} />
              <label>OTP</label>
            </div>
          )}

          {/* 4. Use the loading state to show the spinner */}
          <button className="auth-btn" disabled={loading}>
            {loading ? (
              <div className="spinner"></div>
            ) : (
              step === 1 ? "Send OTP" : "Verify OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}