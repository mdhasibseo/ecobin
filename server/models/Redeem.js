const mongoose = require("mongoose");

const redeemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    pointsUsed: {
      type: Number,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["Bkash", "Nagad", "Rocket"],
      required: true,
    },

    accountNumber: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Redeem",
  redeemSchema
);