import express from "express";
import Comment from "../models/Comment.js";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* GET COMMENTS (public) */
router.get("/:blogId", async (req, res) => {
  const comments = await Comment.find({
    blogId: req.params.blogId,
    parentComment: null, // 👈 only top-level
  })
    .populate("userId", "name")
    .sort({ createdAt: -1 });

  const replies = await Comment.find({
    blogId: req.params.blogId,
    parentComment: { $ne: null },
  }).populate("userId", "name");

  res.json({ comments, replies });
});

/* ADD COMMENT (logged-in users only) */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { blogId, message, parentComment } = req.body;

    const comment = await Comment.create({
      blogId,
      message,
      parentComment: parentComment || null,
      userId: req.user.id,
    });

    const populated = await comment.populate("userId", "name");

    res.status(201).json(populated);
  } catch {
    res.status(400).json({ message: "Failed to add comment" });
  }
});


/* UPDATE COMMENT */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Check if the user is the owner of the comment
    if (comment.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized to edit this comment" });
    }

    comment.message = req.body.message;
    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

/* DELETE COMMENT */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Allow if user is owner OR user is an admin
    const isOwner = comment.userId.toString() === req.user.id;
    const isAdmin = req.user.role === "admin"; // Ensure your authMiddleware provides 'role'

    if (!isOwner && !isAdmin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
