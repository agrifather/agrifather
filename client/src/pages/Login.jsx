import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/auth.css";
import { API_BASE_URL } from "../config/api";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // 1. Add the loading state
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // 2. Start loading
    
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        identifier,
        password,
      });

      login(res.data.token);
      navigate("/");
    } catch (err) {
      // 3. Inform the user and reset loading
      alert(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false); // 4. Stop loading whether success or fail
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
        <form className="auth-card" onSubmit={handleLogin}>
          <h2>Welcome Back</h2>
          <p className="auth-sub">Login to continue your journey</p>

          <div className="input-group">
            <input required onChange={(e) => setIdentifier(e.target.value)} />
            <label>Email or Phone</label>
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

          {/* 5. Update the button to show the spinner */}
          <button className="auth-btn" disabled={loading}>
            {loading ? <div className="spinner"></div> : "Login"}
          </button>

          <p className="auth-footer">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>

          <p style={{textAlign : "center", marginTop : "10px", fontSize : "13px", color : "darkRed"}}>
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </form>
      </div>
    </div>
  );
}