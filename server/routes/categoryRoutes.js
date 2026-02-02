import express from "express";
import { getCategoryContent } from "../controllers/categoryController.js";

const router = express.Router();

router.get("/:type", getCategoryContent);

export default router;