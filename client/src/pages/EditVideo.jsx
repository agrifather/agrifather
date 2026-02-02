import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/adminForm.css";
import { FiArrowLeft } from "react-icons/fi";
import { API_BASE_URL } from "../config/api";

export default function EditVideo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    videoUrl: "",
    thumbnail: "",
    category: "",
  });

  /* 🔹 FETCH VIDEO DETAILS */
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/videos`);

        const video = res.data.find((v) => v._id === id);
        if (!video) return alert("Video not found");

        setForm(video);
      } catch (err) {
        alert("Failed to fetch video");
      }
    };

    fetchVideo();
  }, [id]);

  /* 🔹 HANDLE CHANGE */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* 🔹 UPDATE VIDEO */
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API_BASE_URL}/videos/${id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Video updated successfully");
      navigate("/admin/manage-videos");
    } catch (err) {
      alert("Failed to update video");
    }
  };

  /* 🔹 DELETE VIDEO */
  const handleDelete = async () => {
    if (!window.confirm("Delete this video permanently?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/videos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Video deleted");
      navigate("/admin/manage-videos");
    } catch {
      alert("Failed to delete video");
    }
  };

  return (
    <div className="admin-form-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FiArrowLeft />
        <span>Back</span>
      </button>
      <h1 style={{ marginBottom: "0px" }}>Edit Video</h1>
      <p className="admin-subtitle">
        Update video details or remove it permanently
      </p>

      <form className="admin-form" onSubmit={handleUpdate}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Video Title"
          required
        />

        <input
          type="text"
          name="videoUrl"
          value={form.videoUrl}
          onChange={handleChange}
          placeholder="YouTube Video URL"
          required
        />

        <input
          type="text"
          name="thumbnail"
          value={form.thumbnail}
          onChange={handleChange}
          placeholder="Thumbnail Image URL"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Machines">Machines</option>
          <option value="Seeds">Seeds</option>
          <option value="AI Tools">AI Tools</option>
          <option value="Crop Care">Crop Care</option>
        </select>

        <div className="admin-actions">
          <button type="submit" className="update-btn">
            Update Video
          </button>

          <button
            type="button"
            className="delete-btn"
            onClick={handleDelete}
            style={{ backgroundColor: "#d32f2f" }}
          >
            Delete Video
          </button>
        </div>
      </form>
    </div>
  );
}
