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

router.post("/submit", queryLimiter, submitQuery);
router.get("/admin/all", adminAuth, getAllQueries);
router.post("/admin/reply/:id", adminAuth, replyToQuery);
router.delete("/admin/delete/:id", adminAuth, deleteQuery);

module.exports = router;
