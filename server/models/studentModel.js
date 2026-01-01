const mongoose = require("mongoose");

const studentModelSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
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

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: Number,
    otpExpiry: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("studentModel", studentModelSchema);
