import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";
import { FiArrowLeft } from "react-icons/fi";
import { API_BASE_URL } from "../config/api";

export default function ManageVideos() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  /* 🔹 FETCH VIDEOS */
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/videos`);
      setVideos(res.data);
    } catch (err) {
      console.error("Failed to fetch videos");
    }
  };

  /* 🔹 DELETE VIDEO */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this video?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/videos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Video deleted successfully");
      fetchVideos(); // refresh list
    } catch (err) {
      alert("Failed to delete video");
    }
  };

  return (
    <div className="admin-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FiArrowLeft />
        <span>Back</span>
      </button>
      <h1>Manage Videos</h1>
      <p className="admin-subtitle">Edit video details or remove videos</p>

      <div className="manage-list">
        {videos.length === 0 ? (
          <p>No videos videos found</p>
        ) : (
          videos.map((video) => (
            <div className="manage-item" key={video._id}>
              <div>
                <h4>{video.title}</h4>
                <p>{video.category}</p>
              </div>

              <div className="actions">
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/admin/videos/edit/${video._id}`)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(video._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
