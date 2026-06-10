const User = require("../models/User");
const bcrypt = require("bcryptjs");

const generateToken = require(
  "../utils/generateToken"
);

// Register
const registerUser = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    if (password.length < 6) {
  return res.status(400).json({
    success: false,
    message:
      "Password must be at least 6 characters",
  });
}
const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({
    success: false,
    message:
      "Invalid email format",
  });
}
    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please fill all fields",
      });
    }

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "Email already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
      });

    res.status(201).json({
      success: true,

      token:
        generateToken(user._id),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        points: user.points,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login
const loginUser = async (
  req,
  res
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid credentials",
      });
    }

    const match =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!match) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid credentials",
      });
    }

    res.json({
      success: true,

      token:
        generateToken(user._id),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        points: user.points,
        totalWeight:
          user.totalWeight,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Profile
const getProfile = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.user._id
      ).select("-password");

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};