import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      {/* HEADER */}
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <p>Manage blogs, videos, and platform content</p>
      </div>

      {/* ACTION CARDS */}
      <div className="admin-cards">
        <div className="admin-card" onClick={() => navigate("/admin/add-blog")}>
          <h2>Add Blog</h2>
          <p>Create and publish new farming blogs</p>
        </div>

        <div
          className="admin-card"
          onClick={() => navigate("/admin/add-video")}
        >
          <h2>Add Video</h2>
          <p>Add YouTube farming & AI videos</p>
        </div>

        <div
          className="admin-card"
          onClick={() => navigate("/admin/manage-blogs")}
        >
          <h2>Manage Blogs</h2>
          <p>Edit or delete existing blogs</p>
        </div>

        <div
          className="admin-card"
          onClick={() => navigate("/admin/manage-videos")}
        >
          <h2>Manage Videos</h2>
          <p>Edit or delete existing videos</p>
        </div>

        <div className="admin-card" onClick={() => navigate("/admin/messages")}>
          <h2>Messages</h2>
          <p>View contact form messages</p>
        </div>
      </div>
    </div>
  );
}
