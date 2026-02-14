const express = require("express");
const {
  studentSignup,
  verifyStudentOtp,
  resendStudentOtp,
  studentLogin,
  changePassword,
  resetStudentPassword,
  forgotStudentPassword,
  getAllStudents,
  deleteStudent,
  getStudentProfile,
} = require("../controllers/studentController");
const { otpLimiter, authLimiter } = require("../middlewares/rateLimiter");
const { studentAuth } = require("../middlewares/studentAuth");
const { adminAuth } = require("../middlewares/adminAuth");

const router = express.Router();

// ----------------- 🌍 Public Routes -----------------
// Signup & Login
router.post("/signup", authLimiter, studentSignup);
router.post("/login", authLimiter, studentLogin);

// OTP Related
router.post("/verify-otp", otpLimiter, verifyStudentOtp);
router.post("/resend-otp", otpLimiter, resendStudentOtp);

// Forgot & Reset
router.post("/forgot-password", otpLimiter, forgotStudentPassword);
router.post("/reset-password", authLimiter, resetStudentPassword);

// Authenticated Student
router.post("/change-password", studentAuth, authLimiter, changePassword);
router.get("/profile-details", studentAuth, getStudentProfile);

// ------------------ 🔒 Admin Routes ------------------
router.get("/admin/all", adminAuth, getAllStudents);
router.delete("/admin/delete/:id", adminAuth, deleteStudent);

module.exports = router;
