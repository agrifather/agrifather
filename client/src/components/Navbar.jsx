import { NavLink, Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/nav.css";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* LOGO */}
        <div className="navbar-logo">
          <Link to="/">
            <div className="logo">
              <img
                src="/images/agri-whole.png"
                alt="logo"
                style={{ width: "50px" }}
              />
              <p>AgriFather</p>
            </div>
          </Link>
        </div>

        {/* BURGER ICON */}
        <div
          className={`burger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* LINKS */}
        <nav className={`navbar-links ${menuOpen ? "show" : ""}`}>
          <NavLink to="/" end onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>
            About
          </NavLink>
          <NavLink to="/blogs" onClick={() => setMenuOpen(false)}>
            Blogs
          </NavLink>
          <NavLink to="/videos" onClick={() => setMenuOpen(false)}>
            Videos
          </NavLink>
          <NavLink to="/news" onClick={() => setMenuOpen(false)}>
            News
          </NavLink>
          <NavLink to="/categories" onClick={() => setMenuOpen(false)}>
            Categories
          </NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </NavLink>

          {isLoggedIn && user?.role === "admin" && (
            <NavLink
              to="/admin"
              className="nav-btn admin-btn"
              onClick={() => setMenuOpen(false)}
            >
              Admin Panel
            </NavLink>
          )}

          {!isLoggedIn ? (
            <NavLink
              to="/login"
              className="nav-btn login-btn"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </NavLink>
          ) : (
            <button onClick={handleLogout} className="nav-btn logout-btn">
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
