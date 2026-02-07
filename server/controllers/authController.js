const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authModel = require("../models/authModel");

// --------------------------- ADMIN SIGNUP ---------------------------
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Email check
    const exists = await authModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await authModel.create({
      name,
      email,
      password: hash,
      role: "student",
    });

    res.json({ success: true, message: "Signup successful", user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// --------------------------- ADMIN LOGIN ---------------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "Admin not found." });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.json({ success: false, message: "Incorrect password." });

    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      success: true,
      message: "Admin login successful.",
      token,
      role: user.role,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// --------------------------- CHANGE PASSWORD ---------------------------
exports.changePassword = async (req, res) => {
  try {
    console.log("Console req.body ------>", req.body);
    const { currentPassword, newPassword } = req.body;
    const userId = req.admin.id;

    if (!currentPassword || !newPassword) {
      return res.json({
        success: false,
        message: "All fields are required.",
      });
    }

    // find user
    const user = await authModel.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found.",
      });
    }

    // match old password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    // prevent same password
    const samePassword = await bcrypt.compare(newPassword, user.password);
    if (samePassword) {
      return res.json({
        success: false,
        message: "New password must be different.",
      });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully. Please login again.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
