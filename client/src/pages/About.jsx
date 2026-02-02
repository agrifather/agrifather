import "../styles/about.css";
import { useState, useEffect, useRef } from "react";

// 1. Reusable ScrollReveal Wrapper
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

export default function About() {
  // 2. Optimized Spotlight Effect (Combined the two effects into one)
  useEffect(() => {
    const section = document.querySelector(".about-global");
    if (!section) return;

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      section.style.setProperty("--x", `${x}px`);
      section.style.setProperty("--y", `${y}px`);
    };

    const handleMouseLeave = () => {
      section.style.setProperty("--x", `-100px`);
      section.style.setProperty("--y", `-100px`);
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="about-page">
      {/* HERO BANNER - Usually loads immediately */}
      <section className="about-hero">
        <div className="about-hero-overlay">
          <h1 className="head-title">About <img style={{maxWidth : "100px"}} src="/images/agri-whole.png" alt="logo" /> AgriFather</h1>
        </div>
      </section>

      {/* WHO WE ARE - Reveal on Scroll */}
      <ScrollReveal>
        <section className="about-section">
          <div className="about-text">
            <h2 style={{ fontSize: "40px" }}>Who We Are</h2>
            <p>
              AgriFather is a modern digital agriculture platform built to
              empower farmers with reliable knowledge, advanced technology, and
              smart farming solutions. We aim to simplify agriculture by
              combining traditional farming wisdom with modern innovations.
            </p>
            <p>
              Our platform provides curated blogs, expert insights, machinery
              guides, AI-based tools, and educational videos to help farmers
              make informed decisions.
            </p>
          </div>

          <div className="about-image">
            <div className="box">
              <img
                src="/images/ai.webp"
                alt="Farming field"
                loading="lazy" /* Added Data Lazy Loading */
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* MISSION & VISION - Reveal on Scroll */}
      <ScrollReveal>
        <section className="about-section reverse">
          <div className="about-text">
            <h2 style={{ fontSize: "40px" }}>Our Mission & Vision</h2>
            <p>
              Our mission is to bridge the gap between farmers and technology by
              providing accessible, practical, and actionable agricultural
              knowledge.
            </p>
            <ul>
              <li>Promote sustainable farming practices</li>
              <li>Encourage smart and AI-driven agriculture</li>
              <li>Support farmers with trusted information</li>
            </ul>
          </div>

          <div className="about-image">
            <div className="box">
              <img
                src="/images/seed.webp"
                alt="Mission farming"
                loading="lazy" /* Added Data Lazy Loading */
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* GLOBAL SECTION - Reveal on Scroll */}
      <ScrollReveal>
        <section className="about-global">
          <div className="about-overlay">
            <h2>Connecting Global Farmers</h2>
            <p>
              AgriFather connects farmers across regions, enabling knowledge
              sharing, innovation, and collaboration to build a stronger global
              agricultural community.
            </p>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
