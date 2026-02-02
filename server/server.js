import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

import "./cron/newsCron.js";

import blogRoutes from "./routes/blogRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"
import newsRoutes from "./routes/newsRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARES
const allowedOrigins = process.env.ALLOWED_ORIGINS
  .split(",")
  .map(o => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server, cron, Postman, etc.
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error("❌ Blocked by CORS:", origin);
      return callback(null, false);
    },
    credentials: true,
  })
);

app.use(express.json());

// CONNECT DATABASE
connectDB();

// ROUTES
app.use(`${process.env.API_PREFIX}/auth`, authRoutes);
app.use(`${process.env.API_PREFIX}/user`, userRoutes);
app.use(`${process.env.API_PREFIX}/admin`, adminRoutes);
app.use(`${process.env.API_PREFIX}/blogs`, blogRoutes);
app.use(`${process.env.API_PREFIX}/comments`, commentRoutes);
app.use(`${process.env.API_PREFIX}/videos`, videoRoutes);
app.use(`${process.env.API_PREFIX}/contact`, contactRoutes);
app.use(`${process.env.API_PREFIX}/news`, newsRoutes);
app.use(`${process.env.API_PREFIX}/category`, categoryRoutes);

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on ${process.env.APP_BASE_URL}`);
});
