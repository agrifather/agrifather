import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/categoryPage.css";
import { API_BASE_URL } from "../config/api";
import { FiArrowLeft } from "react-icons/fi";

export default function CategoryPage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/category/${type}`);
        setBlogs(res.data.blogs || []);
        setVideos(res.data.videos || []);
      } catch (err) {
        console.error("CATEGORY PAGE ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [type]);

  if (loading)
    return (
      <div className="loadingBox" style={{ minHeight: "60vh" }}>
        Loading content...
      </div>
    );

  return (
    <div className="category-Page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FiArrowLeft />
        <span>Back</span>
      </button>

      <h1 className="category-Title" style={{ fontSize: "42px" }}>
        {type.replace("-", " ")}
      </h1>

      {/* BLOGS */}
      <section className="category-Section">
        <h2 style={{ textAlign: "left" }}>Blogs</h2>

        {blogs.length === 0 ? (
          <p className="empty-Text">No blogs available for this category.</p>
        ) : (
          <div className="gridBox">
            {blogs.map((blog) => (
              <div className="cardBox" key={blog._id}>
                <img src={blog.thumbnail} alt={blog.title} />
                <div className="card-Content">
                  <h3>{blog.title}</h3>
                  <p className="author">By {blog.author}</p>
                  <a href={`/blogs/${blog._id}`} className="btnPrimary">
                    Read Blog →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* VIDEOS */}
      <section className="category-Section">
        <h2 style={{ textAlign: "left" }}>Videos</h2>

        {videos.length === 0 ? (
          <p className="empty-Text">No videos available for this category.</p>
        ) : (
          <div className="gridBox">
            {videos.map((video) => (
              <div className="cardBox" key={video._id}>
                <img src={video.thumbnail} alt={video.title} />
                <div className="card-Content">
                  <h3>{video.title}</h3>
                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btnSecondary"
                  >
                    ▶ Watch Video
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
