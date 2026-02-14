const express = require("express");
const {
  signup,
  login,
  changePassword,
  forgotAdminPassword,
  resetAdminPassword,
  // resendAdminOtp,
} = require("../controllers/adminAuthController");
const { otpLimiter, authLimiter } = require("../middlewares/rateLimiter");
const { adminAuth } = require("../middlewares/adminAuth");

const router = express.Router();

// ------------------ 🔒 Admin Routes ------------------
// router.post("/admin/signup", authLimiter, signup);

router.post("/admin/login", authLimiter, login);

router.post("/admin/forgot-password", otpLimiter, forgotAdminPassword);

router.post("/admin/reset-password", authLimiter, resetAdminPassword);

router.post("/admin/change-password", adminAuth, authLimiter, changePassword);

// router.post("/admin/resend-otp", resendAdminOtp);

module.exports = router;
