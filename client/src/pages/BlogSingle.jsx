import axios from "axios";
import "../styles/blogSingle.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiShare2, FiCopy } from "react-icons/fi";
import {
  FaWhatsapp,
  FaTwitter,
  FaFacebook,
  FaTelegram,
} from "react-icons/fa";
import { API_BASE_URL } from "../config/api";

export default function BlogSingle() {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- AUTH DATA ---
  const token = localStorage.getItem("token");
  let currentUserId = null;
  let currentUserRole = null;

  if (token) {
    try {
      // Decode the payload from the JWT
      const payload = JSON.parse(atob(token.split(".")[1]));
      currentUserId = payload.id;
      currentUserRole = payload.role;
    } catch (e) {
      console.error("Token parsing failed", e);
    }
  }

  // --- STATE ---
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [replyTo, setReplyTo] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [message, setMessage] = useState("");
  const [openReplies, setOpenReplies] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editMessage, setEditMessage] = useState("");

  const blogUrl = window.location.href;

  const copyLink = () => {
    navigator.clipboard.writeText(blogUrl);
    alert("Link copied to clipboard!");
  };

  /* FETCH BLOG */
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  /* FETCH COMMENTS */
  useEffect(() => {
    axios.get(`${API_BASE_URL}/comments/${id}`).then((res) => {
      setComments(res.data.comments);
      setReplies(res.data.replies);
    });
  }, [id]);

  /* ADD COMMENT */
  const handleComment = async () => {
    if (!message.trim()) return;

    if (!token) {
      alert("Please login to comment");
      return;
    }

    try {
      const res = await axios.post(
        `${API_BASE_URL}/comments`,
        { blogId: id, message },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // ✅ USE SERVER RESPONSE AS-IS
      setComments([res.data, ...comments]);
      setMessage("");
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  /* DELETE COMMENT */
  const handleDelete = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Remove from comments
      setComments((prev) => prev.filter((c) => c._id !== commentId));

      // ✅ Remove from replies
      setReplies((prev) => prev.filter((r) => r._id !== commentId));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  /* UPDATE COMMENT */
  const handleUpdate = async (commentId) => {
    if (!editMessage.trim()) return;

    try {
      await axios.put(
        `${API_BASE_URL}/comments/${commentId}`,
        { message: editMessage },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // ✅ Update COMMENTS
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId ? { ...c, message: editMessage } : c,
        ),
      );

      // ✅ Update REPLIES
      setReplies((prev) =>
        prev.map((r) =>
          r._id === commentId ? { ...r, message: editMessage } : r,
        ),
      );

      setEditingId(null);
      setEditMessage("");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleReply = async (commentId) => {
    if (!replyMessage.trim()) return;

    try {
      const res = await axios.post(
        `${API_BASE_URL}/comments`,
        {
          blogId: id,
          message: replyMessage,
          parentComment: commentId,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setReplies([res.data, ...replies]);
      setReplyTo(null);
      setReplyMessage("");
    } catch (err) {
      console.error("Reply failed", err);
    }
  };

  if (!blog) return <p className="loading">Loading...</p>;

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="blog-single">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FiArrowLeft />
        <span>Back</span>
      </button>

      <div className="content">
        <h2 style={{ textAlign: "center" }}>{blog.title}</h2>
        <img
          src={blog.thumbnail}
          alt={blog.title}
          loading="lazy" /* Data Lazy Loading */
          style={{
            alignSelf: "center",
            width: "70vw",
            maxWidth: "800px",
            marginBottom: "10px",
          }}
        />
        <div className="blog-content">{blog.content}</div>
      </div>

      <hr className="blog-divider" />

      {/* SHARE BOX */}
      <div className="share-box">
        <span className="share-label">
          <FiShare2 /> Share:
        </span>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(blogUrl)}`}
          target="_blank"
          rel="noreferrer"
          className="share-btn whatsapp"
        >
          <FaWhatsapp />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            blogUrl,
          )}&text=${encodeURIComponent(blog.title)}`}
          target="_blank"
          rel="noreferrer"
          className="share-btn twitter"
        >
          <FaTwitter />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`}
          target="_blank"
          rel="noreferrer"
          className="share-btn facebook"
        >
          <FaFacebook />
        </a>

        {/* Telegram */}
        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(blogUrl)}&text=${encodeURIComponent(blog.title)}`}
          target="_blank"
          rel="noreferrer"
          className="share-btn telegram"
        >
          <FaTelegram />
        </a>
        <button className="share-btn copy" onClick={copyLink}>
          <FiCopy />
        </button>
      </div>

      <hr className="blog-divider" />

      {/* COMMENTS SECTION */}
      <div className="comments">
        <h3>Comments ({comments.length})</h3>

        <div className="com-box">
          {comments.map((c) => {
            const commentReplies = replies.filter(
              (r) => r.parentComment?.toString() === c._id.toString(),
            );
            return (
              <div key={c._id} className="comment">
                <div className="info-comment">
                  <div className="comment-header">
                    <strong>
                      {c.userId?.name}{" "}
                      {c.userId?._id === currentUserId && "(You)"}
                    </strong>
                    <span className="comment-time">
                      {formatDateTime(c.createdAt)}
                    </span>
                  </div>

                  {editingId === c._id ? (
                    <textarea
                      className="edit-input"
                      value={editMessage}
                      onChange={(e) => setEditMessage(e.target.value)}
                    />
                  ) : (
                    <p>{c.message}</p>
                  )}
                </div>

                <div className="manage-comment">
                  <div className="manage">
                    {/* 1. Only the owner can EDIT their own comment */}
                    {c.userId?._id === currentUserId &&
                      (editingId === c._id ? (
                        <>
                          <button
                            className="upd-btn bttn"
                            onClick={() => handleUpdate(c._id)}
                          >
                            Save
                          </button>
                          <button
                            className="cancel-btn bttn"
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className="edit-com bttn"
                          onClick={() => {
                            setEditingId(c._id);
                            setEditMessage(c.message);
                          }}
                        >
                          Edit
                        </button>
                      ))}

                    {/* 2. Owner OR Admin can DELETE */}
                    {/* Condition ensures Admin sees Delete on all, but only Edit on their own */}
                    {(c.userId?._id === currentUserId ||
                      currentUserRole === "admin") &&
                      !editingId && (
                        <button
                          className="del-com bttn"
                          onClick={() => handleDelete(c._id)}
                        >
                          Delete
                        </button>
                      )}
                  </div>

                  <div className="rly">
                    <button
                      className="reply-btn bttn"
                      onClick={() =>
                        setReplyTo(replyTo === c._id ? null : c._id)
                      }
                    >
                      {replyTo === c._id ? "Cancel" : "Reply"}
                    </button>

                    {/* REPLY INPUT */}
                    {replyTo === c._id && (
                      <div className="reply-box">
                        <textarea
                          placeholder="Write a reply..."
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                        />
                        <div className="reply-actions">
                          <button onClick={() => handleReply(c._id)}>
                            Post
                          </button>
                          <button
                            className="cancel-btn bttn"
                            onClick={() => {
                              setReplyTo(null);
                              setReplyMessage("");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {commentReplies.length > 0 && (
                      <button
                        className="see-replies-btn bttn"
                        onClick={() =>
                          setOpenReplies(openReplies === c._id ? null : c._id)
                        }
                      >
                        {openReplies === c._id
                          ? "Hide replies"
                          : `See replies (${commentReplies.length})`}
                      </button>
                    )}

                    {/* SHOW REPLIES */}

                    {openReplies === c._id && (
                      <div className="replies">
                        {replies
                          .filter(
                            (r) =>
                              r.parentComment?.toString() === c._id.toString(),
                          )
                          .map((r) => (
                            <div key={r._id} className="reply">
                              <div className="comment-header">
                                <strong>
                                  {r.userId?.name}{" "}
                                  {r.userId?._id === currentUserId && "(You)"}
                                </strong>
                                <span className="comment-time">
                                  {formatDateTime(r.createdAt)}
                                </span>
                              </div>

                              <div className="manage-comment-reply">
                                <p>{r.message}</p>

                                {/* EDIT REPLY (OWNER ONLY) */}
                                <div className="manage-btn-reply">
                                  {r.userId?._id === currentUserId &&
                                    (editingId === r._id ? (
                                      <>
                                        <textarea
                                          className="edit-input"
                                          value={editMessage}
                                          onChange={(e) =>
                                            setEditMessage(e.target.value)
                                          }
                                        />
                                        <button
                                          className="upd-btn bttn"
                                          onClick={() => handleUpdate(r._id)}
                                        >
                                          Save
                                        </button>
                                        <button
                                          className="cancel-btn bttn"
                                          onClick={() => setEditingId(null)}
                                        >
                                          Cancel
                                        </button>
                                      </>
                                    ) : (
                                      <button
                                        className="edit-com bttn"
                                        onClick={() => {
                                          setEditingId(r._id);
                                          setEditMessage(r.message);
                                        }}
                                      >
                                        Edit
                                      </button>
                                    ))}

                                  {/* DELETE REPLY (OWNER OR ADMIN) */}
                                  {(r.userId?._id === currentUserId ||
                                    currentUserRole === "admin") &&
                                    editingId !== r._id && (
                                      <button
                                        className="del-com bttn"
                                        onClick={() => handleDelete(r._id)}
                                      >
                                        Delete
                                      </button>
                                    )}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* POST COMMENT FORM */}
        {token ? (
          <div className="comment-form">
            <textarea
              placeholder="Write a comment..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleComment} className="bttn post-btn">
              Post Comment
            </button>
          </div>
        ) : (
          <p className="login-prompt">Please login to add a comment.</p>
        )}
      </div>
    </div>
  );
}
