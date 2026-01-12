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
} = require("../controllers/studentController");
const { queryLimiter } = require("../middlewares/rateLimiter");
const { studentAuth } = require("../middlewares/studentAuth");
const { adminAuth } = require("../middlewares/adminAuth");

const router = express.Router();

router.post("/signup", queryLimiter, studentSignup);
router.post("/verify-otp", queryLimiter, verifyStudentOtp);
router.post("/resend-otp", queryLimiter, resendStudentOtp);

router.post("/login", studentLogin);

router.post("/forgot-password", queryLimiter, forgotStudentPassword);
router.post("/reset-password", resetStudentPassword);

router.post("/change-password", studentAuth, changePassword);

// 🔒 Admin routes
router.get("/admin/all", adminAuth, getAllStudents);
router.delete("/admin/delete/:id", adminAuth, deleteStudent);

module.exports = router;
