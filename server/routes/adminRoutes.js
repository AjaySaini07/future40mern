const express = require("express");
const { getAdminStats } = require("../controllers/adminController");
const { adminAuth } = require("../middlewares/adminAuth");

const router = express.Router();

// 🔐 Admin-Only Routes
router.get("/stats", adminAuth, getAdminStats);

module.exports = router;
