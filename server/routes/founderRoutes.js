const express = require("express");
const router = express.Router();
const {
  getFounder,
  getFounderAdmin,
  upsertFounder,
} = require("../controllers/founderController");

// const upload = require("../middlewares/cloudinaryUpload");
const cloudinaryUpload = require("../middlewares/cloudinaryUpload");
const uploadFounder = cloudinaryUpload("founder");
const { adminAuth } = require("../middlewares/adminAuth");

// 🌐 Public routes
router.get("/founder-info", getFounder);

// 🔐 Admin only routes
router.get("/admin/founder-info", adminAuth, getFounderAdmin);

router.post(
  "/admin/founder-update",
  adminAuth,
  uploadFounder.single("image"),
  upsertFounder,
);

module.exports = router;
