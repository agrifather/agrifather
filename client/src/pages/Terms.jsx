import { useState, useEffect, useRef } from "react";
import "../styles/privacy.css"; // Reusing the same styling for consistency

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

export default function Terms() {
  return (
    <div className="privacy-page">
      {/* HEADER */}
      <section className="privacy-hero">
        <h1>Terms & Conditions</h1>
      </section>

      {/* CONTENT */}
      <section className="privacy-content">
        <ScrollReveal>
          <div className="privacy-column">
            <h2 style={{textAlign:"left"}}>Acceptance of Terms</h2>
            <p style={{textAlign:"left"}}>
              By accessing, browsing, or using AgriFather (“we”, “our”, “us”),
              you acknowledge that you have read, understood, and agree to be
              bound by these Terms & Conditions. If you do not agree with any
              part of these terms, you must discontinue use of our platform
              immediately.
            </p>

            <h2 style={{textAlign:"left"}}>About AgriFather</h2>
            <p style={{textAlign:"left"}}>
              AgriFather is an informational and educational platform focused on
              modern agriculture. We provide farming-related blogs, curated
              educational videos, AI-assisted tools, and agriculture-related
              news sourced from trusted third-party providers.
            </p>
            <p style={{textAlign:"left"}}>
              All content on AgriFather is intended for informational purposes
              only and should not be considered professional agricultural,
              financial, or legal advice.
            </p>

            <h2 style={{textAlign:"left"}}>User Eligibility</h2>
            <p style={{textAlign:"left"}}>
              You must be at least 16 years of age to use this platform. By
              using AgriFather, you confirm that you meet this requirement and
              have the legal capacity to enter into this agreement.
            </p>

            <h2 style={{textAlign:"left"}}>User Conduct</h2>
            <p style={{textAlign:"left"}}>You agree not to:</p>
            <ul>
              <li>Use the platform for any unlawful or fraudulent purpose</li>
              <li>
                Post or transmit harmful, misleading, or offensive content
              </li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Misuse blogs, videos, or data for commercial exploitation</li>
            </ul>

            <h2 style={{textAlign:"left"}}>Intellectual Property</h2>
            <p style={{textAlign:"left"}}>
              All original content published on AgriFather, including text,
              design, logos, blogs, and platform structure, is the intellectual
              property of AgriFather unless otherwise stated.
            </p>
            <p style={{textAlign:"left"}}>
              Third-party content such as news articles and videos remain the
              property of their respective owners and are displayed for
              reference and educational purposes only.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="privacy-column">

            <h2 style={{textAlign:"left"}}>Third-Party Links & Content</h2>
            <p style={{textAlign:"left"}}>
              AgriFather may contain links to external websites, news platforms,
              or video providers. We do not control or endorse the content,
              accuracy, or policies of these third-party websites.
            </p>
            <p style={{textAlign:"left"}}>
              Visiting external links is done at your own risk, and you are
              encouraged to review their respective terms and privacy policies.
            </p>

            <h2 style={{textAlign:"left"}}>Limitation of Liability</h2>
            <p style={{textAlign:"left"}}>
              AgriFather shall not be held responsible for any direct or
              indirect losses, damages, or farming outcomes resulting from
              reliance on the information provided on the platform.
            </p>
            <p style={{textAlign:"left"}}>
              Agricultural practices vary by region, soil, climate, and
              resources. Always consult qualified agricultural professionals
              before applying new methods.
            </p>
            <h2 style={{textAlign:"left"}}>Account Responsibility</h2>
            <p style={{textAlign:"left"}}>
              If you create an account on AgriFather, you are responsible for
              maintaining the confidentiality of your login credentials and all
              activities performed under your account.
            </p>

            <h2 style={{textAlign:"left"}}>Termination of Access</h2>
            <p style={{textAlign:"left"}}>
              We reserve the right to suspend or terminate access to AgriFather
              at any time, without prior notice, if we believe these Terms have
              been violated or if continued access may harm the platform or its
              users.
            </p>

            <h2 style={{textAlign:"left"}}>Changes to Terms</h2>
            <p style={{textAlign:"left"}}>
              AgriFather may update these Terms & Conditions from time to time.
              Any changes will be posted on this page, and continued use of the
              platform constitutes acceptance of the updated terms.
            </p>

            <h2 style={{textAlign:"left"}}>Governing Law</h2>
            <p style={{textAlign:"left"}}>
              These Terms & Conditions shall be governed and interpreted in
              accordance with the laws applicable in your jurisdiction, without
              regard to conflict of law principles.
            </p>

            <h2 style={{textAlign:"left"}}>Contact Information</h2>
            <p style={{textAlign:"left"}}>
              If you have any questions regarding these Terms & Conditions,
              please contact us through the official AgriFather contact channels
              provided on our website.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
