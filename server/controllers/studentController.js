const studentModel = require("../models/studentModel");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const otpEmailTemplate = require("../templates/otpEmailTemplate");
const transporter = require("../utils/mailer");
const successStoryModel = require("../models/successStoryModel");

/* OTP generator */
const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

/* -------------------- STUDENT SIGNUP -------------------- */
exports.studentSignup = async (req, res) => {
  try {
    console.log("Body Console ----->", req.body);
    const { fullname, email, password, gender, dob, mobile } = req.body;

    const exists = await studentModel.findOne({ email });

    // 🔁 Resend OTP if not verified
    if (exists && !exists.isVerified) {
      const otp = generateOTP();

      exists.otp = otp;
      exists.otpExpiry = Date.now() + 5 * 60 * 1000;
      await exists.save();

      await transporter.sendMail({
        from: `"Future40" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Verify Your Account - OTP",
        html: otpEmailTemplate(otp), // 👈 USE TEMPLATE
      });

      return res.status(200).json({
        success: true,
        message: "OTP already sent. Please verify your email.",
      });
    }

    if (exists && exists.isVerified) {
      return res.status(400).json({
        message: "Account already exists. Please login.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    await studentModel.create({
      fullName: fullname,
      email,
      password: hashedPassword,
      gender,
      dob,
      mobile,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000,
    });

    await transporter.sendMail({
      from: `"Future40" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Verify Your Account - OTP",
      html: otpEmailTemplate(otp), // 👈 USE TEMPLATE
    });

    res.status(201).json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({
      message: "Signup failed",
    });
  }
};

/* ---------------------- VERIFY OTP ---------------------- */
exports.verifyStudentOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const student = await studentModel.findOne({ email });
    // ✅ Student not found
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // ✅ Already verified
    if (student.isVerified) {
      return res.status(400).json({
        message: "Account already verified",
      });
    }

    // ✅ OTP expired check FIRST
    if (!student.otpExpiry || student.otpExpiry < Date.now()) {
      return res.status(400).json({
        message: "OTP expired. Please resend OTP.",
      });
    }

    // ✅ OTP match check AFTER expiry check
    if (student.otp !== Number(otp)) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    student.isVerified = true;
    student.otp = undefined;
    student.otpExpiry = undefined;

    await student.save();

    res.json({
      success: true,
      message: "Account verified successfully",
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(500).json({ message: "OTP verification failed" });
  }
};

/* ---------------------- RESEND OTP ---------------------- */
exports.resendStudentOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const student = await studentModel.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.isVerified) {
      return res.status(400).json({ message: "Account already verified" });
    }

    // 🔒 If old OTP is still valid → block resend
    if (student.otpExpiry && student.otpExpiry > Date.now()) {
      const msLeft = student.otpExpiry - Date.now();

      const totalSeconds = Math.ceil(msLeft / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      let timeMsg = "";
      if (minutes > 0) {
        timeMsg = `${minutes} min${seconds > 0 ? ` ${seconds} sec` : ""}`;
      } else {
        timeMsg = `${seconds} sec`;
      }

      return res.status(400).json({
        message: `Please wait ${timeMsg} before requesting a new OTP`,
      });
    }

    // 🔐 Generate new OTP
    const otp = generateOTP();

    student.otp = otp;
    student.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min
    await student.save();

    await transporter.sendMail({
      from: `"Future40" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Your New OTP Code - Future40",
      html: otpEmailTemplate(otp, "Your New OTP Code"), // ✅ TEMPLATE USED
    });

    res.json({
      success: true,
      message: "New OTP sent to email",
    });
  } catch (error) {
    console.error("Resend OTP Error:", error);
    res.status(500).json({ message: "Resend OTP failed" });
  }
};

/* --------------------- STUDENT LOGIN --------------------- */
exports.studentLogin = async (req, res) => {
  try {
    console.log("Login body console ----->", req.body);
    const { email, password } = req.body;

    // check fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // find student
    const student = await studentModel.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // check verified
    if (!student.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email first" });
    }

    // 🔐 GENERATE JWT
    const token = jwt.sign(
      {
        id: student._id,
        FullName: student.fullName,
        Email: student.email,
        role: "student",
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      student: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

/* -------------------- FORGOT PASSWORD -------------------- */
exports.forgotStudentPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const student = await studentModel.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // 🔒 OTP still valid → block resend (REUSE LOGIC)
    if (student.otpExpiry && student.otpExpiry > Date.now()) {
      const msLeft = student.otpExpiry - Date.now();

      const totalSeconds = Math.ceil(msLeft / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      return res.status(400).json({
        message: `Please wait ${minutes} min ${seconds} sec before requesting a new OTP`,
      });
    }

    // 🔐 Generate OTP
    const otp = generateOTP();
    student.otp = otp;
    student.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min

    await student.save();

    // 📧 Send email
    await transporter.sendMail({
      from: `"Future40" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password - Future40",
      html: otpEmailTemplate(otp, "Reset Your Password"),
    });

    res.json({
      success: true,
      message: "OTP sent to email for password reset",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Forgot password failed" });
  }
};

/* --------------------- RESET PASSWORD --------------------- */
exports.resetStudentPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        message: "Email, OTP and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const student = await studentModel.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // ⏱️ OTP expiry check FIRST
    if (!student.otpExpiry || student.otpExpiry < Date.now()) {
      return res.status(400).json({
        message: "OTP expired. Please request a new one.",
      });
    }

    // 🔢 OTP match check
    if (student.otp !== Number(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // 🔐 Hash new password
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(newPassword, salt);

    // 🧹 Clear OTP
    student.otp = undefined;
    student.otpExpiry = undefined;

    await student.save();

    res.json({
      success: true,
      message: "Password reset successfully. Please login.",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Reset password failed" });
  }
};

/* --------------------- CHANGE PASSWORD --------------------- */
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // 🔍 Validate input
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Current and new password required" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // 🔍 Find student
    const student = await studentModel.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // 🔐 Compare current password
    const isMatch = await bcrypt.compare(currentPassword, student.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // 🔐 Hash new password (same password allowed now)
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(newPassword, salt);

    await student.save();

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Password change failed" });
  }
};

// 🔒 ADMIN – Get All Students (Search + Pagination + Filters) ---------------------
exports.getAllStudents = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";
    const gender = req.query.gender; // male | female | other
    const story = req.query.story; // true | false

    const skip = (page - 1) * limit;

    /* -------------------- BASE QUERY -------------------- */
    const query = {
      isVerified: true,
      $or: [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
      ],
    };

    // 🎯 Gender filter
    if (gender) {
      query.gender = gender;
    }

    /* -------------------- FETCH STUDENTS -------------------- */
    let students = await studentModel
      .find(query)
      .select("-password -otp -otpExpiry")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const studentEmails = students.map((s) => s.email);

    /* -------------------- SUCCESS STORY CHECK -------------------- */
    const stories = await successStoryModel.find(
      { email: { $in: studentEmails } },
      { email: 1 }
    );

    const storyEmailSet = new Set(stories.map((s) => s.email.toLowerCase()));

    students = students.map((student) => ({
      ...student,
      hasSubmittedStory: storyEmailSet.has(student.email.toLowerCase()),
    }));

    /* -------------------- STORY FILTER -------------------- */
    if (story === "true") {
      students = students.filter((s) => s.hasSubmittedStory);
    }

    if (story === "false") {
      students = students.filter((s) => !s.hasSubmittedStory);
    }

    /* -------------------- TOTAL COUNT -------------------- */
    const total = await studentModel.countDocuments(query);

    res.status(200).json({
      success: true,
      students,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Fetch Students Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
    });
  }
};

// 🔒 ADMIN – Delete Student -------------------------------------
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await studentModel.findById(id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // 🧹 Delete related success stories
    await successStoryModel.deleteMany({ student: id });

    await studentModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Delete Student Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete student",
    });
  }
};
