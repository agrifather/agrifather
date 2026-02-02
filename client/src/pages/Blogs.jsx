import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/blogs.css";
import { AiOutlineSearch } from "react-icons/ai";
import { API_BASE_URL } from "../config/api";

// 1. ScrollReveal Component for UI Lazy Loading
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

export default function Blogs() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let url = `${API_BASE_URL}/blogs`;
    if (filter !== "All") {
      url = `${API_BASE_URL}/blogs?category=${filter}`;
    }
    axios
      .get(url)
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));
  }, [filter]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/blogs?trending=true`)
      .then((res) => setTrendingBlogs(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="blogs-page">
      <div className="blogs-hero">
        <h1>Blog Listing</h1>
      </div>

      <div className="blogs-container">
        {/* MAIN BLOG LIST */}
        <div className="blogs-main">
          <div className="filter-bar">
            {["All", "Machines", "Crop-Care", "AI-Tools", "Seeds", "Fertilizers"].map(
              (cat) => (
                <button
                  key={cat}
                  className={filter === cat ? "active" : ""}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              )
            )}
          </div>

          {/* Wrap each blog row in ScrollReveal for lazy appearance */}
          {filteredBlogs.map((blog) => (
            <ScrollReveal key={blog._id}>
              <div
                className="blog-row"
                onClick={() => navigate(`/blogs/${blog._id}`)}
              >
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  loading="lazy" /* Data Lazy Loading */
                />
                <div className="blog-info">
                  <h3>{blog.title}</h3>
                  <p>{blog.content.slice(0, 120)}...</p>
                  <div className="blog-meta">
                    <span>Author: {blog.author}</span>
                    <button>Read More</button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* SIDEBAR */}
        <aside className="blogs-sidebar">
          <div className="sidebar-box">
            <h3 style={{ marginBottom: "5px" }}>Search</h3>
            <div className="search-box">
              <input
                placeholder="Search blog..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button>
                <AiOutlineSearch />
              </button>
            </div>
          </div>

          <ScrollReveal>
            <div className="sidebar-box">
              <h2 style={{ textAlign: "center" }}>Trending Blogs</h2>
              {trendingBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="trending-box"
                  onClick={() => navigate(`/blogs/${blog._id}`)}
                >
                  <h4>{blog.title}</h4>
                  <span>
                    <button>Read</button>
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </aside>
      </div>
    </div>
  );
}
