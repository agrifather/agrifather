import express from "express";
import News from "../models/News.js";
import { fetchAndStoreNews } from "../controllers/newsController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Fetch from external APIs and store
router.get("/fetch", authMiddleware, adminMiddleware, fetchAndStoreNews);

router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ publishedAt: -1 }).limit(30);

    res.json(news);
  } catch (err) {
    res.status(500).json({ message: "Failed to load news" });
  }
});

export default router;
