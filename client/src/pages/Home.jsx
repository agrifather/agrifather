import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/home.css";
import { FaPlayCircle } from "react-icons/fa";
import { API_BASE_URL } from "../config/api";

// 1. Create the ScrollReveal Wrapper Component
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
    observer.observe(domRef.current);
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

export default function Home() {
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState(null);
  const [latestVideos, setLatestVideos] = useState([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/blogs?trending=true`)
      .then((res) => setTrendingBlogs(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`${API_BASE_URL}/videos`)
      .then((res) => setLatestVideos(res.data.slice(0, 3)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home">
      {/* HERO - Loads immediately for UX */}
      <section className="hero">
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src="/video/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>
              Empowering Farmers <br />
              <span>with Knowledge & Technology</span>
              <div
                style={{ listStyle: "none", fontSize: 20, color: "#cde7ce" }}
              >
                <p style={{ margin: "10px 0" }}>
                  Trusted by farmers to learn modern techniques, smart tools,
                  and AI-driven agriculture insights
                </p>
                <li>Farming Blogs | Farming Related Videos | Tips</li>
              </div>
            </h1>
            <div className="hero-actions">
              <button onClick={() => navigate("/blogs")}>Explore Blogs</button>
              <button onClick={() => navigate("/videos")}>Watch Videos</button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES - Reveal on Scroll */}
      <ScrollReveal>
        <section className="categories">
          {[
            { title: "Crop Care", img: "/images/crop.webp", path : "/Crop-Care" },
            { title: "Machines", img: "/images/machine.webp", path : "/Machines" },
            { title: "Seeds", img: "/images/seed.webp", path : "/Seeds" },
            { title: "AI Tools", img: "/images/ai.webp", path : "/Ai-Tools" },
            { title: "Fertilizers", img: "/images/fertilizers.webp", path : "/Fertilizers" },
          ].map((cat) => (
            <div
              key={cat.title}
              className="category-box"
              style={{
                backgroundImage: `url(${cat.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => navigate(`/category/${cat.path}`)}
            >
              <p>{cat.title}</p>
            </div>
          ))}
        </section>
      </ScrollReveal>

      {/* 3. TRENDING BLOGS - Reveal on Scroll */}
      <ScrollReveal>
        <section className="blogs">
          <h2
            style={{
              fontSize: "40px",
              marginBottom: "30px",
              textAlign: "center",
            }}
          >
            Trending Blogs
          </h2>
          <div className="blog-grid">
            {trendingBlogs.map((blog) => (
              <BlogCard
                key={blog._id}
                title={blog.title}
                desc={blog.content.slice(0, 100) + "..."}
                img={blog.thumbnail}
                onClick={() => navigate(`/blogs/${blog._id}`)}
              />
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* 4. VIDEOS - Reveal on Scroll */}
      <ScrollReveal>
        <section className="videos">
          <h2
            style={{
              fontSize: "40px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            Latest Videos
          </h2>
          <div className="video-grid">
            {latestVideos.map((video) => (
              <div
                className="video-card"
                key={video._id}
                onClick={() => setVideoUrl(video.videoUrl)}
              >
                <img src={video.thumbnail} alt={video.title} loading="lazy" />
                <p style={{ textAlign: "center", fontWeight: "700" }}>
                  {video.title}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* VIDEO MODAL */}
      {videoUrl && (
        <div className="video-modal" onClick={() => setVideoUrl(null)}>
          <div className="video-box" onClick={(e) => e.stopPropagation()}>
            <iframe src={videoUrl} title="video" allowFullScreen></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

function BlogCard({ title, desc, img, onClick }) {
  return (
    <div className="blog-card" onClick={onClick}>
      <img src={img} alt={title} loading="lazy" />
      <h3>{title}</h3>
      <p>{desc}</p>
      <span>Read More →</span>
    </div>
  );
}
