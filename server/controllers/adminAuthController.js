const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const otpEmailTemplate = require("../templates/otpEmailTemplate");
const transporter = require("../utils/mailer");
const adminAuthModel = require("../models/adminAuthModel");

// -------- OTP generator
const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

// --------------------------- Admin Signup ---------------------------
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await adminAuthModel.findOne({ role: "admin" });
    if (exists) {
      return res.status(403).json({
        message: "Admin already exists. Signup is disabled.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await adminAuthModel.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({
      success: true,
      message: "Admin account created successfully",
    });
  } catch (error) {
    console.error("Admin Signup Error:", error);
    res.status(500).json({ message: "Signup failed" });
  }
};

// ---------------------------- Admin Login ---------------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const admin = await adminAuthModel.findOne({ email, role: "admin" });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
        name: admin.name,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      success: true,
      message: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

// ------------------------- Change Password --------------------------
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const adminId = req.admin.id;

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

    const admin = await adminAuthModel.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ message: "Password change failed" });
  }
};

// -------------------------- Resend Admin Otp ------------------------
// exports.resendAdminOtp = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     const admin = await adminAuthModel.findOne({ email, role: "admin" });
//     if (!admin) {
//       return res.status(404).json({ message: "Admin not found" });
//     }

//     // 🔒 If OTP still valid → block resend
//     if (admin.otpExpiry && admin.otpExpiry > Date.now()) {
//       const secondsLeft = Math.ceil((admin.otpExpiry - Date.now()) / 1000);

//       return res.status(400).json({
//         message: `Please wait ${secondsLeft} seconds before requesting a new OTP`,
//       });
//     }

//     // 🔐 Generate new OTP
//     const otp = generateOTP();
//     admin.otp = otp;
//     admin.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

//     await admin.save();

//     await transporter.sendMail({
//       from: `"Future40" <${process.env.GMAIL_USER}>`,
//       to: email,
//       subject: "Reset Admin Password - Future40",
//       html: otpEmailTemplate(otp, "Reset Admin Password"),
//     });

//     res.json({
//       success: true,
//       message: "New OTP sent to admin email",
//     });
//   } catch (error) {
//     console.error("Resend Admin OTP Error:", error);
//     res.status(500).json({ message: "Resend OTP failed" });
//   }
// };

// ------------------------- Forgot Password --------------------------
exports.forgotAdminPassword = async (req, res) => {
  console.log("req.body ------->", req.body);
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const admin = await adminAuthModel.findOne({ email, role: "admin" });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // 🔒 OTP still valid
    if (admin.otpExpiry && admin.otpExpiry > Date.now()) {
      const secondsLeft = Math.ceil((admin.otpExpiry - Date.now()) / 1000);
      return res.status(400).json({
        message: `Please wait ${secondsLeft} seconds before requesting a new OTP`,
      });
    }

    const otp = generateOTP();
    admin.otp = otp;
    admin.otpExpiry = Date.now() + 5 * 60 * 1000;

    await admin.save();

    await transporter.sendMail({
      from: `"Future40" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Reset Admin Password - Future40",
      html: otpEmailTemplate(otp, "Reset Admin Password"),
    });

    res.json({
      success: true,
      message: "OTP sent to admin email",
    });
  } catch (error) {
    console.error("Forgot Admin Password Error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// -------------------------- Reset Password ---------------------------
exports.resetAdminPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email, OTP and new password required" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const admin = await adminAuthModel.findOne({ email, role: "admin" });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (!admin.otpExpiry || admin.otpExpiry < Date.now()) {
      return res.status(400).json({
        message: "OTP expired. Please request a new one.",
      });
    }

    if (admin.otp !== Number(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    admin.otp = undefined;
    admin.otpExpiry = undefined;

    await admin.save();

    res.json({
      success: true,
      message: "Password reset successfully. Please login.",
    });
  } catch (error) {
    console.error("Reset Admin Password Error:", error);
    res.status(500).json({ message: "Reset password failed" });
  }
};
