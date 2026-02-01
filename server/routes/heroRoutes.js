const express = require("express");
const router = express.Router();

const {
  getHeroInfo,
  getHero,
  updateHero,
} = require("../controllers/heroController");
const { adminAuth } = require("../middlewares/adminAuth");
// const upload = require("../middlewares/cloudinaryUpload");
const cloudinaryUpload = require("../middlewares/cloudinaryUpload");
const uploadHero = cloudinaryUpload("hero");

// 🌍 Public Routes
router.get("/hero-info", getHeroInfo);

// 🔐 Admin-Only Routes
router.get("/admin/hero-info", adminAuth, getHero);
router.post(
  "/admin/hero-update",
  adminAuth,
  uploadHero.single("backgroundImage"),
  updateHero,
);

module.exports = router;
