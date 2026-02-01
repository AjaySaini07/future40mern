const express = require("express");
const {
  submitQuery,
  getAllQueries,
  replyToQuery,
  deleteQuery,
} = require("../controllers/queryController");
const { adminAuth } = require("../middlewares/adminAuth");
const { queryLimiter } = require("../middlewares/rateLimiter");

const router = express.Router();

// 🌍 Public Routes
router.post("/submit", queryLimiter, submitQuery);

// 🔐 Admin-Only Routes
router.get("/admin/all", adminAuth, getAllQueries);
router.post("/admin/reply/:id", adminAuth, replyToQuery);
router.delete("/admin/delete/:id", adminAuth, deleteQuery);

module.exports = router;
