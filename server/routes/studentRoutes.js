const express = require("express");
const {
  studentSignup,
  verifyStudentOtp,
  resendStudentOtp,
  studentLogin,
} = require("../controllers/studentController");

const router = express.Router();

router.post("/signup", studentSignup);
router.post("/verify-otp", verifyStudentOtp);
router.post("/resend-otp", resendStudentOtp);
router.post("/login", studentLogin);

module.exports = router;
