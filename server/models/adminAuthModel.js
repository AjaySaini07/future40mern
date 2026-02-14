const mongoose = require("mongoose");

const adminAuthModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    // 🔐 OTP (FORGOT PASSWORD ONLY)
    otp: {
      type: Number,
    },

    otpExpiry: {
      type: Date,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("adminAuth", adminAuthModelSchema);
