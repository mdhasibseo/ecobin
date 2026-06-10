const Redeem = require("../models/Redeem");
const User = require("../models/User");

// Create Redeem Request
const createRedeem = async (req, res) => {
  try {
    const {
      pointsUsed,
      paymentMethod,
      accountNumber,
    } = req.body;

    const user = await User.findById(
      req.user._id
    );

    if (user.points < pointsUsed) {
      return res.status(400).json({
        success: false,
        message: "Not enough points",
      });
    }

    const amount = pointsUsed / 10;

    const redeem = await Redeem.create({
      user: user._id,
      pointsUsed,
      amount,
      paymentMethod,
      accountNumber,
    });

    user.points -= pointsUsed;

    await user.save();

    res.status(201).json({
      success: true,
      redeem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Redeem History
const getRedeemHistory = async (
  req,
  res
) => {
  try {
    const history =
      await Redeem.find({
        user: req.user._id,
      }).sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const approveRedeem = async (
  req,
  res
) => {
  try {
    const redeem =
      await Redeem.findById(
        req.params.id
      );

    if (!redeem) {
      return res.status(404).json({
        success: false,
        message:
          "Redeem not found",
      });
    }

    redeem.status =
      "Approved";

    await redeem.save();

    res.json({
      success: true,
      message:
        "Redeem approved",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};
const rejectRedeem = async (
  req,
  res
) => {
  try {
    const redeem =
      await Redeem.findById(
        req.params.id
      );

    if (!redeem) {
      return res.status(404).json({
        success: false,
        message:
          "Redeem not found",
      });
    }

    const user =
      await User.findById(
        redeem.user
      );

    user.points +=
      redeem.pointsUsed;

    await user.save();

    redeem.status =
      "Rejected";

    await redeem.save();

    res.json({
      success: true,
      message:
        "Redeem rejected and points refunded",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

module.exports = {
  createRedeem,
  getRedeemHistory,
  approveRedeem,
  rejectRedeem,
};