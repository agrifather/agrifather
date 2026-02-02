import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminMessages.css";
import { FiArrowLeft } from "react-icons/fi";
import { API_BASE_URL } from "../config/api";

export default function AdminMessages() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/contact/${id}`);
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/contact`)
      .then((res) => {
        setMessages(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{minHeight : "80vh"}} className="loading">Loading messages...</p>;
  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(search.toLowerCase()) ||
      msg.email.toLowerCase().includes(search.toLowerCase()) ||
      msg.subject.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="admin-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft />
          <span>Back</span>
        </button>
      <h1>Contact Messages</h1>
      <p className="admin-subtitle">Messages received from contact form</p>
      <input
        type="text"
        placeholder="Search by name, email or subject..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="message-list">
        
        {filteredMessages.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          filteredMessages.map((msg) => (
            <div key={msg._id} className="message-card">
              <div className="message-header">
                <h4>{msg.subject}</h4>
                <span>{new Date(msg.createdAt).toLocaleString()}</span>
              </div>

              <p style={{ textAlign: "left" }} className="message-text">
                {msg.message}
              </p>

              <div className="message-footer">
                <strong>{msg.name}</strong>
                <a
                  href={`mailto:${msg.email}`}
                  style={{ marginBottom: "10px" }}
                >
                  {msg.email}
                </a>
              </div>

              <button
                className="delete-btn"
                onClick={() => handleDelete(msg._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
