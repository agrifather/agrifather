import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    url: { type: String, unique: true },
    source: String,
    publishedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("News", newsSchema);
