import "../styles/privacy.css";
import { useState, useEffect, useRef } from "react";

// Reusable ScrollReveal Wrapper for UI Lazy Loading
function ScrollReveal({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domRef.current);
        }
      });
    });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`reveal-section ${isVisible ? "is-visible" : ""}`}
    >
      {children}
    </div>
  );
}

export default function Privacy() {
  return (
    <div className="privacy-page">
      {/* HEADER */}
      <section className="privacy-hero">
        <h1>Privacy Policy</h1>
      </section>

      {/* CONTENT */}
      <section className="privacy-content" >
        <ScrollReveal>
          <div className="privacy-column" >
            <h2 style={{textAlign:"left"}}>Privacy Policy</h2>
            <h4>Last updated: {new Date().toLocaleDateString()}</h4>
            <br />

            <p style={{textAlign:"left"}}>
              AgriFather (“we”, “our”, “us”) respects your privacy and is
              committed to protecting the personal information of our users.
              This Privacy Policy explains how we collect, use, store, and
              safeguard your information when you access or use our website,
              services, blogs, videos, and related features.
            </p>

            <p style={{textAlign:"left"}}>
              By using AgriFather, you agree to the practices described in this
              Privacy Policy.
            </p>

            <h2 style={{textAlign:"left"}}>Overview</h2>
            <p style={{textAlign:"left"}}>
              AgriFather is an educational and informational platform focused on
              modern agriculture. We provide farming blogs, curated agricultural
              videos, and farming-related news sourced from trusted external
              platforms using public APIs.
            </p>

            <p style={{textAlign:"left"}}>
              Our goal is to empower farmers, students, and agriculture
              enthusiasts with knowledge, tools, and insights. We do not sell
              personal data and collect only the information necessary to
              operate and improve our platform.
            </p>

            <h2 style={{textAlign:"left"}}>Information We Collect</h2>
            <p style={{textAlign:"left"}}>We may collect the following information when you:</p>
            <ul>
              <li>Register an account on AgriFather</li>
              <li>Contact us using forms or email</li>
              <li>Subscribe to updates or newsletters</li>
              <li>Interact with protected or personalized features</li>
            </ul>

            <p style={{textAlign:"left"}}>This information may include:</p>
            <ul>
              <li>Your name</li>
              <li>Email address</li>
              <li>Mobile number (if provided)</li>
              <li>Login credentials (stored securely)</li>
              <li>Usage data such as pages visited and interactions</li>
            </ul>

            <h2 style={{textAlign:"left"}}>How We Use Your Information</h2>
            <p style={{textAlign:"left"}}>We use collected information for the following purposes:</p>
            <ul>
              <li>To create and manage user accounts</li>
              <li>To respond to user inquiries and support requests</li>
              <li>To improve website performance and user experience</li>
              <li>To personalize content and recommendations</li>
              <li>To maintain platform security</li>
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="privacy-column">
            <h2 style={{textAlign:"left"}}>Cookies & Tracking Technologies</h2>
            <p style={{textAlign:"left"}}>
              AgriFather uses cookies and similar technologies to enhance user
              experience, analyze website traffic, and support advertising
              services.
            </p>

            <p style={{textAlign:"left"}}>
              Cookies help us understand how users interact with our website so
              we can improve performance and content quality. You can disable
              cookies through your browser settings, but some features may not
              function properly.
            </p>

            <h2 style={{textAlign:"left"}}>Third-Party Services</h2>
            <p style={{textAlign:"left"}}>AgriFather uses third-party services such as:</p>
            <ul>
              <li>Analytics tools (e.g., Google Analytics)</li>
              <li>Advertising platforms (e.g., Google AdSense)</li>
              <li>Video platforms (e.g., YouTube embeds)</li>
              <li>News providers via public APIs</li>
            </ul>

            <p style={{textAlign:"left"}}>
              These services may collect information according to their own
              privacy policies. AgriFather does not control how third parties
              handle your data.
            </p>

            <h2 style={{textAlign:"left"}}>Data Protection & Security</h2>
            <p style={{textAlign:"left"}}>
              We implement reasonable technical and organizational security
              measures to protect your personal data against unauthorized
              access, misuse, alteration, or disclosure.
            </p>

            <p style={{textAlign:"left"}}>
              While we strive to protect your data, no method of transmission
              over the Internet is 100% secure, and we cannot guarantee absolute
              security.
            </p>

            <h2 style={{textAlign:"left"}}>Your Rights</h2>
            <p style={{textAlign:"left"}}>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your account and personal data</li>
              <li>Withdraw consent where applicable</li>
            </ul>

            <h2 style={{textAlign:"left"}}>Changes to This Policy</h2>
            <p style={{textAlign:"left"}}>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated date. Continued use of
              AgriFather means acceptance of the updated policy.
            </p>

            <h2 style={{textAlign:"left"}}>Contact Us</h2>
            <p style={{textAlign:"left"}}>
              If you have any questions or concerns about this Privacy Policy or
              how we handle your data, please contact us through the AgriFather
              Contact page.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
