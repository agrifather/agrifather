import { Link } from "react-router-dom";
import "../styles/footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube} from "react-icons/fa";

const VITE_TWITTER_USER = import.meta.env.VITE_TWITTER_USER || "AgriFather";
const VITE_FACEBOOK_USER = import.meta.env.VITE_FACEBOOK_USER || "AgriFather";
const VITE_INSTAGRAM_USER = import.meta.env.VITE_INSTAGRAM_USER || "agri.father";
const VITE_YOUTUBE_USER = import.meta.env.VITE_YOUTUBE_USER || "@AgriFather";

export default function Footer() {
  console.log("All Env Vars:", import.meta.env);
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* BRAND */}
        <div className="footer-brand">
          
          <img src="/images/agri-whole.png" alt="logo" style={{width : "100px"}}/>
          <h3 style={{fontWeight : "900"}}>AgriFather</h3>
          <p style={{marginTop : "10px"}}>
            Empowering farmers with <br />
            <strong>knowledge & technology</strong>.
          </p>
        </div>

        {/* FEATURES */}
        <div className="footer-column">
          <h4>Platform Features</h4>
          <ul>
            <li>Smart Farming Insights</li>
            <li>Crop Advisory</li>
            <li>Weather Forecast</li>
            <li>Soil Health Analysis</li>
            <li>Market Price Updates</li>
          </ul>
        </div>

        {/* RESOURCES */}
        <div className="footer-column">
          <h4>Resources</h4>
          <ul>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/videos">Videos</Link>
            </li>
            <li>
              <Link to="/news">News</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/contact">Support</Link>
            </li>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
          </ul>
        </div>

        <div className="footer-social-card">
          <h3>Follow AgriFather</h3>
          <p>Stay connected with us on social media</p>

          <div className="social-icons">
            <a
              href={`https://www.facebook.com/${VITE_FACEBOOK_USER}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href={`https://www.instagram.com/${VITE_INSTAGRAM_USER}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href={`https://twitter.com/${VITE_TWITTER_USER}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>

            <a
              href={`https://www.youtube.com/${VITE_YOUTUBE_USER}`}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>© 2025 AgriFather | Empowering Farmers Digitally</p>
        <div className="footer-bottom-links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <span> | </span>
          <Link to="/terms">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
