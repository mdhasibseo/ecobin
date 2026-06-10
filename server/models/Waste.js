const mongoose = require("mongoose");

const wasteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    wasteType: {
      type: String,
      default: "Unknown",
    },

    weight: {
      type: Number,
      required: true,
    },

    points: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "approved",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Waste",
  wasteSchema
);