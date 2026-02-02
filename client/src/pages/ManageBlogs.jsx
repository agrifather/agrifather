import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { API_BASE_URL } from "../config/api";

import "../styles/admin.css";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/blogs`);
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_BASE_URL}/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchBlogs(); // refresh list
    } catch (err) {
      alert("Failed to delete blog");
    }
  };

  return (
    <div className="admin-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FiArrowLeft />
        <span>Back</span>
      </button>
      <h1>Manage Blogs</h1>
      <p className="admin-subtitle">Update content or remove blogs if needed</p>

      <div className="manage-list">
        {blogs.map((blog) => (
          <div className="manage-item" key={blog._id}>
            <div>
              <h4>{blog.title}</h4>
              <p>Category: {blog.category}</p>
            </div>

            <div className="actions">
              <button
                className="edit-btn"
                // onClick={() => navigate(`/admin/edit-blog/${blog._id}`)
                onClick={() => navigate(`/admin/blogs/edit/${blog._id}`)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(blog._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {blogs.length === 0 && <p>No blogs found</p>}
      </div>
    </div>
  );
}
