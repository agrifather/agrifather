import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/admin.css";
import { FiArrowLeft } from "react-icons/fi";
import { API_BASE_URL } from "../config/api";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    category: "",
    thumbnail: "",
    isTrending: false,
  });

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch(() => alert("Failed to load blog"));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBlog({ ...blog, [name]: type === "checkbox" ? checked : value });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    await axios.put(`${API_BASE_URL}/blogs/${id}`, blog, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("Blog updated successfully");
    navigate("/admin/manage-blogs");
  };

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirm) return;

    const token = localStorage.getItem("token");

    await axios.delete(`${API_BASE_URL}/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("Blog deleted");
    navigate("/admin/manage-blogs");
  };

  return (
    <div className="admin-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FiArrowLeft />
        <span>Back</span>
      </button>
      <h1>Edit Blog</h1>
      <p className="admin-subtitle">
        Update blog details or remove it permanently
      </p>

      <div className="admin-card">
        <label>Title</label>
        <input name="title" value={blog.title} onChange={handleChange} />

        <label>Category</label>
        <select name="category" value={blog.category} onChange={handleChange}>
          <option value="cropcare">Crop Care</option>
          <option value="machines">Machines</option>
          <option value="seeds">Seeds</option>
          <option value="aitools">AI Tools</option>
        </select>

        <label>Thumbnail URL</label>
        <input
          name="thumbnail"
          value={blog.thumbnail}
          onChange={handleChange}
        />

        <label>Content</label>
        <textarea
          rows="6"
          name="content"
          value={blog.content}
          onChange={handleChange}
        />

        <label className="checkbox" style={{ textAlign: "center" }}>
          <input
            type="checkbox"
            name="isTrending"
            checked={blog.isTrending}
            onChange={handleChange}
            style={{ width: "15px", margin: "0 5px 0 0" }}
          />
          Mark as Trending
        </label>

        <div className="admin-actions">
          <button className="save-btn" onClick={handleUpdate}>
            Update Blog
          </button>

          <button className="delete-btn" onClick={handleDelete}>
            Delete Blog
          </button>
        </div>
      </div>
    </div>
  );
}
