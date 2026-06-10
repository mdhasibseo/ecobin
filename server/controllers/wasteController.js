const Waste = require("../models/Waste");
const User = require("../models/User");
const calculatePoints = require("../utils/pointCalculator");


// Upload Waste
const uploadWaste = async (req, res) => {
  try {
    const { image, weight, wasteType } = req.body;
    const allowedTypes = ["Plastic", "Paper", "Glass", "Metal"];

    if (wasteType && !allowedTypes.includes(wasteType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid waste type",
      });
    }
    if (weight <= 0) {
      return res.status(400).json({
        success: false,
        message: "Weight must be greater than zero",
      });
    }

    if (!image || !weight) {
      return res.status(400).json({
        success: false,
        message: "Image and weight required",
      });
    }

    const points = calculatePoints(weight, wasteType);

    const waste = await Waste.create({
      user: req.user._id,
      image,
      weight,
      wasteType,
      points,
    });

    // Update user
    const user = await User.findById(req.user._id);

    user.points += points;
    user.totalWeight += Number(weight);

    await user.save();

    res.json({
      success: true,
      waste,
      updatedUser: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get History
const getWasteHistory = async (req, res) => {
  try {
    const wastes = await Waste.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      wastes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const recent = await Waste.find({
      user: req.user._id,
    })
      .sort({
        createdAt: -1,
      })
      .limit(5);
    const totalUploads = await Waste.countDocuments({
      user: req.user._id,
    });

    res.json({
      success: true,

      dashboard: {
        totalPoints: user.points,

        totalWeight: user.totalWeight,

        totalUploads,

        recentActivity: recent,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  uploadWaste,
  getWasteHistory,
  getDashboard,
};