import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminForm.css";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

export default function AddBlog() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
    category: "",
    thumbnail: "",
    isTrending: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/blogs`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Blog added successfully");
    } catch (err) {
      alert("Failed to add blog");
    }
  };

  return (
    <div className="admin-form-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FiArrowLeft />
        <span>Back</span>
      </button>
      <h1>Add New Blog</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author Name"
          onChange={handleChange}
        />

        <input
          type="text"
          name="thumbnail"
          placeholder="Thumbnail Image URL"
          onChange={handleChange}
          required
        />

        <select name="category" onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Crop-Care">Crop Care</option>
          <option value="Machines">Machines</option>
          <option value="Seeds">Seeds</option>
          <option value="Ai-Tools">AI Tools</option>
          <option value="Fertilizers">Fertilizers</option>
          
        </select>

        <textarea
          name="content"
          placeholder="Blog Content"
          rows="8"
          onChange={handleChange}
          required
        />

        <label className="checkbox">
          <input type="checkbox" name="isTrending" onChange={handleChange} />
          Mark as Trending
        </label>

        <button type="submit">Publish Blog</button>
      </form>
    </div>
  );
}
