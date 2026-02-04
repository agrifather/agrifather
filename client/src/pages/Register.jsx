import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { API_BASE_URL } from "../config/api";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Register() {
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState(""); // email or phone
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      await axios.post(`${API_BASE_URL}/auth/send-otp`, {
        email: identifier,
      });
      setStep(2);
      alert("OTP sent successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false); // Stop loading regardless of success/fail
    }
  };

  const verifyAndRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      await axios.post(`${API_BASE_URL}/auth/verify-otp-register`, {
        name,
        email: identifier,
        phone,
        otp,
        password,
      });
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="auth-page">
      {/* LEFT */}
      <div className="auth-left">
        <h1>Join AgriFather</h1>
        <p>
          Learn • Grow • Innovate <br />
          with modern agriculture
        </p>
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <form
          className="auth-card"
          onSubmit={step === 1 ? sendOtp : verifyAndRegister}
        >
          <h2>Create Account</h2>
          <p className="auth-sub">Start your smart farming journey</p>

          <div className="input-group">
            <input required onChange={(e) => setName(e.target.value)} />
            <label>Full Name</label>
          </div>
          <div className="input-group">
            <input required onChange={(e) => setPhone(e.target.value)} />
            <label>Mobile Number</label>
          </div>

          <div className="input-group">
            <input required onChange={(e) => setIdentifier(e.target.value)} />
            <label>Email</label>
          </div>

          {step === 2 && (
            <>
              <div className="input-group">
                <input required onChange={(e) => setOtp(e.target.value)} />
                <label>Enter OTP</label>
              </div>

              <div className="input-group password-group">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Password</label>

                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
            </>
          )}

          <button className="auth-btn" disabled={loading}>
            {loading ? (
              <div className="spinner"></div>
            ) : step === 1 ? (
              "Send OTP"
            ) : (
              "Verify & Register"
            )}
          </button>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
