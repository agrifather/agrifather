import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.json({ userId: req.user.id });
});

export default router;
