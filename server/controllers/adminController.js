const User = require("../models/User");
const Waste = require("../models/Waste");
const Redeem = require("../models/Redeem");

// All Users
const getAllUsers = async (
  req,
  res
) => {
  try {
    const users =
      await User.find().select(
        "-password"
      );

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Dashboard Stats
const getStats = async (req, res) => {
  try {
    const totalUsers =
      await User.countDocuments();

    const totalWaste =
      await Waste.countDocuments();

    const pendingRedeems =
      await Redeem.countDocuments({
        status: "Pending",
      });

    const totalRedeems =
      await Redeem.countDocuments();

    const wasteData =
      await Waste.find();

    const totalWeight =
      wasteData.reduce(
        (sum, item) =>
          sum + item.weight,
        0
      );

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalWaste,
        totalWeight,
        totalRedeems,
        pendingRedeems,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// All Redeems
const getAllRedeems =
  async (req, res) => {
    try {
      const redeems =
        await Redeem.find()
          .populate(
            "user",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,
        redeems,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// Approve
const approveRedeem =
  async (req, res) => {
    try {
      const redeem =
        await Redeem.findById(
          req.params.id
        );

      if (!redeem) {
        return res
          .status(404)
          .json({
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

// Reject
const rejectRedeem = async (req, res) => {
  try {
    const redeem = await Redeem.findById(
      req.params.id
    );

    if (!redeem) {
      return res.status(404).json({
        success: false,
        message: "Redeem not found",
      });
    }

    const user = await User.findById(
      redeem.user
    );

    user.points += redeem.pointsUsed;

    await user.save();

    redeem.status = "Rejected";

    await redeem.save();

    res.json({
      success: true,
      message: "Redeem rejected",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// All Waste
const getAllWaste = async (
  req,
  res
) => {
  try {
    const wastes =
      await Waste.find()
        .populate(
          "user",
          "name email"
        )
        .sort({
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
  const getAnalytics = async (
  req,
  res
) => {
  try {
    // Waste Types
    const wasteTypes =
      await Waste.aggregate([
        {
          $group: {
            _id: "$wasteType",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

    // Monthly Uploads
    const monthlyUploads =
      await Waste.aggregate([
        {
          $group: {
            _id: {
              month: {
                $month:
                  "$createdAt",
              },
            },
            uploads: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            "_id.month": 1,
          },
        },
      ]);

    // Top Users
    const topUsers =
      await User.find()
        .sort({
          points: -1,
        })
        .limit(5)
        .select(
          "name points"
        );

    // Redeem Stats
    const pending =
      await Redeem.countDocuments(
        {
          status:
            "Pending",
        }
      );

    const approved =
      await Redeem.countDocuments(
        {
          status:
            "Approved",
        }
      );

    const rejected =
      await Redeem.countDocuments(
        {
          status:
            "Rejected",
        }
      );

    res.json({
      success: true,
      analytics: {
        wasteTypes,
        monthlyUploads,
        topUsers,
        redeems: {
          pending,
          approved,
          rejected,
        },
      },
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
  getStats,
  getAllUsers,
  getAllWaste,
  getAllRedeems,
  approveRedeem,
  rejectRedeem,
  getAnalytics,
};