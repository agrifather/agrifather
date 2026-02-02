import Blog from "../models/Blog.js";
import Video from "../models/Video.js";

export const getCategoryContent = async (req, res) => {
  try {
    const { type } = req.params;

    const allowedCategories = [
      "Machines",
      "Seeds",
      "Ai-Tools",
      "Crop-Care",
      "Fertilizers",
    ];

    if (!allowedCategories.includes(type)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const blogs = await Blog.find({ category: type })
      .sort({ createdAt: -1 })
      .limit(20);

    const videos = await Video.find({ category: type })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      category: type,
      blogs,
      videos,
    });
  } catch (error) {
    console.error("CATEGORY FETCH ERROR:", error);
    res.status(500).json({ message: "Failed to fetch category data" });
  }
};
