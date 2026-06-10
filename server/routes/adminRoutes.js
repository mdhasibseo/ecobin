const express = require("express");

const router =
  express.Router();

const {
  getStats,
  getAllRedeems,
  approveRedeem,
  rejectRedeem,
  getAllUsers,
  getAllWaste,
  getAnalytics,
} = require(
  "../controllers/adminController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const {
  adminOnly,
} = require(
  "../middleware/adminMiddleware"
);

router.get(
  "/stats",
  protect,
  adminOnly,
  getStats
);

router.get(
  "/users",
  protect,
  adminOnly,
  getAllUsers
);

router.get(
  "/redeems",
  protect,
  adminOnly,
  getAllRedeems
);

router.get(
  "/analytics",
  protect,
  adminOnly,
  getAnalytics
);

router.get(
  "/waste",
  protect,
  adminOnly,
  getAllWaste
);

router.put(
  "/redeem/:id/approve",
  protect,
  adminOnly,
  approveRedeem
);

router.put(
  "/redeem/:id/reject",
  protect,
  adminOnly,
  rejectRedeem
);

module.exports = router;