import express from "express";
import Video from "../models/Video.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

/* ================= PUBLIC ROUTES ================= */

/* GET ALL VIDEOS (LATEST FIRST) */
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch videos" });
  }
});

/* ================= ADMIN ROUTES ================= */

/* ADD VIDEO (ADMIN ONLY) */
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const video = await Video.create(req.body);
    res.status(201).json(video);
  } catch (err) {
    console.error("VIDEO CREATE ERROR:", err);
    res.status(400).json({ message: "Video creation failed" });
  }
});

router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(video);
});

router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: "Video deleted successfully" });
  } catch {
    res.status(400).json({ message: "Delete failed" });
  }
});

export default router;
