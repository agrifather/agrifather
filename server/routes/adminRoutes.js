import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import Blog from "../models/Blog.js";
import Video from "../models/Video.js";

const router = express.Router();

/* ================= ADMIN ROUTES ================= */

/* ADD BLOG */
router.post(
  "/blog",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const blog = await Blog.create(req.body);
      res.status(201).json(blog);
    } catch (err) {
      res.status(400).json({ message: "Failed to add blog" });
    }
  }
);

/* ADD VIDEO */
router.post(
  "/video",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const video = await Video.create(req.body);
      res.status(201).json(video);
    } catch (err) {
      res.status(400).json({ message: "Failed to add video" });
    }
  }
);

export default router;
