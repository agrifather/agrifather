import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: String,
    videoUrl: String,
    thumbnail: String,
    category: {
      type: String,
      enum: ["Machines", "Seeds", "Ai-Tools", "Crop-Care", "Fertilizers"],
      required: true,
    },
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Video", videoSchema);
