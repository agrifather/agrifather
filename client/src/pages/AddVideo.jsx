import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/adminForm.css";
import { FiArrowLeft } from "react-icons/fi";
import { API_BASE_URL } from "../config/api";

export default function AddVideo() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    videoUrl: "",
    thumbnail: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      await axios.post(`${API_BASE_URL}/videos`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Video added successfully");
    } catch (err) {
      alert("Failed to add video");
    }
  };

  return (
    <div className="admin-form-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FiArrowLeft />
        <span>Back</span>
      </button>
      <h1>Add New Video</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Video Title"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="videoUrl"
          placeholder="YouTube Embed URL"
          onChange={handleChange}
          required
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
          <option value="Ai-Tools">AI Tools</option>
          <option value="Seeds">Seeds</option>
          <option value="Fertilizers">Fertilizers</option>
        </select>

        <button type="submit">Publish Video</button>
      </form>
    </div>
  );
}
