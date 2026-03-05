const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { generalLimiter } = require("./middlewares/rateLimiter");

dotenv.config();
const app = express();

// Middlewares
app.set("trust proxy", 1);

app.use(
  cors({
    origin: ["http://localhost:5173", "https://future40.vercel.app"],
    credentials: true,
  }),
);

app.options("*", cors());

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(generalLimiter);
app.set("trust proxy", 1);

// Database connect
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/success-stories", require("./routes/storyRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/queries", require("./routes/queryRoutes"));
app.use("/api/contactinfo", require("./routes/contactInfoRoutes"));
app.use("/api/founder", require("./routes/founderRoutes"));
app.use("/api/banner", require("./routes/bannerRoutes"));
app.use("/api/hero", require("./routes/heroRoutes"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
