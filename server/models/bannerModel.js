const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    image: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number, // for frontend sorting
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Banner", bannerSchema);
