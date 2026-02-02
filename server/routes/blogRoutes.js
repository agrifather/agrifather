import express from "express";
import Blog from "../models/Blog.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

/* ================= PUBLIC ================= */

/* GET ALL BLOGS */
router.get("/", async (req, res) => {
  try {
    const { category, trending } = req.query;

    let filter = {};
    if (category) filter.category = category;
    if (trending) filter.isTrending = true;

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json(blogs);
  } catch {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});

/* GET SINGLE BLOG */
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch {
    res.status(404).json({ message: "Blog not found" });
  }
});

/* ================= ADMIN ================= */

/* CREATE BLOG */
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const blog = await Blog.create(req.body);
      res.status(201).json(blog);
    } catch {
      res.status(400).json({ message: "Blog creation failed" });
    }
  }
);

/* UPDATE BLOG */
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedBlog);
    } catch {
      res.status(400).json({ message: "Update failed" });
    }
  }
);

/* DELETE BLOG */
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      await Blog.findByIdAndDelete(req.params.id);
      res.json({ message: "Blog deleted successfully" });
    } catch {
      res.status(400).json({ message: "Delete failed" });
    }
  }
);

export default router;
