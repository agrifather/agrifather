import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Machines", "Seeds", "Ai-Tools", "Crop-Care", "Fertilizers"],
      required: true,
    },
    thumbnail: {
      type: String, // image URL
    },
    author: {
      type: String,
      default: "AgriFather Team",
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
