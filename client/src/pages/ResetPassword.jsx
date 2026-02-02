import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/auth.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { API_BASE_URL } from "../config/api";

export default function ResetPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);

  const resetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      await axios.post(`${API_BASE_URL}/auth/forgot-password/reset`, {
        identifier: state.email,
        otp: state.otp,
        newPassword,
      });

      alert("Password reset successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    }
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
        <form className="auth-card" onSubmit={resetPassword}>
          <h2>Reset Password</h2>
          <p className="auth-sub">Create a new password</p>

          <div className="input-group password-group">
            <input
              type={show ? "text" : "password"}
              required
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label>New Password</label>
            <span onClick={() => setShow(!show)} className="toggle-password">
              {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          <div className="input-group password-group">
            <input
              type={show ? "text" : "password"}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label>Confirm Password</label>
          </div>

          <button className="auth-btn">Reset Password</button>
        </form>
      </div>
    </div>
  );
}
