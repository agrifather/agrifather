import axios from "axios";
import { useEffect, useState, useRef } from "react";
import "../styles/videos.css";
import { FaPlayCircle } from "react-icons/fa";
import { API_BASE_URL } from "../config/api";

// 1. Reusable ScrollReveal Wrapper for UI Lazy Loading
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

export default function Video() {
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/videos`)
      .then((res) => setVideos(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="videos-page">
      <h1 style={{ textAlign: "center", margin: "40px 0" }}>
        Latest Farming Videos
      </h1>

      <div className="video-grid">
        {videos.map((video) => (
          /* Wrap each card in ScrollReveal for staggered loading */
          <ScrollReveal key={video._id}>
            <div
              className="video-card"
              onClick={() => setActiveVideo(video.videoUrl)}
            >
              <div className="video-thumbnail-container">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  loading="lazy" /* Browser-level data lazy loading */
                />
                <div className="play-btn">
                  <FaPlayCircle />
                </div>
              </div>
              <p
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  fontWeight: "700",
                  padding: "0 10px",
                }}
              >
                {video.title}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* VIDEO MODAL */}
      {activeVideo && (
        <div className="video-modal" onClick={() => setActiveVideo(null)}>
          <div className="video-box" onClick={(e) => e.stopPropagation()}>
            <iframe src={activeVideo} title="video" allowFullScreen />
          </div>
        </div>
      )}
    </div>
  );
}
