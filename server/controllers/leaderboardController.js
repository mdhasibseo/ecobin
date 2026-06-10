const User = require("../models/User");

const getLeaderboard = async (
  req,
  res
) => {
  try {
    const users =
      await User.find(
        {},
        "name points totalWeight avatar"
      )
        .sort({ points: -1 })
        .limit(20);

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

module.exports = {
  getLeaderboard,
};