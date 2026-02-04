import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // 1. If no token, kick them to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    // 2. Basic check to see if token is a valid format
    // This decodes the middle part of the JWT
    const payload = JSON.parse(atob(token.split(".")[1]));

    // 3. Check if the token is expired (Optional but recommended)
    // Date.now() is in ms, payload.exp is usually in seconds
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }

    // 4. If everything is fine, show the page
    return children;
  } catch (error) {
    console.error("Auth Error:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
}