const studentModel = require("../models/studentModel");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const otpEmailTemplate = require("../templates/otpEmailTemplate");

/* OTP generator */
const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

/* Gmail transporter */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

/* ================= STUDENT SIGNUP ================= */
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

/* ================= VERIFY OTP ================= */
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

/* ================= RESEND OTP ================= */
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

/* ================= STUDENT LOGIN ================= */
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
