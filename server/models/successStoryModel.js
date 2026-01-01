const mongoose = require("mongoose");

const successStorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },

    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: {
        values: ["Male", "Female"],
        message: "Gender must be Male or Female",
      },
    },

    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },

    story: {
      type: String,
      required: [true, "Success story is required"],
      minlength: [20, "Story must be at least 20 characters"],
      trim: true,
    },

    achievement: {
      type: String,
      required: [true, "Achievement is required"],
      minlength: [5, "Achievement must be at least 5 characters"],
      trim: true,
    },

    // photo: {
    //   type: String, // optional (filename / url)
    //   default: null,
    // },
    photo: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        default: null,
      },
    },

    approved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("successStoryModel", successStorySchema);
