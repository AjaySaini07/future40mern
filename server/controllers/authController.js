const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authModel = require("../models/authModel");

// --------------------------- SIGNUP ---------------------------

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

// --------------------------- LOGIN ---------------------------

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.json({ success: false, message: "Incorrect password" });

    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      role: user.role,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
