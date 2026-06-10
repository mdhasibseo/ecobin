const express = require("express");


const router =
  express.Router();

const {
  createRedeem,
  getRedeemHistory,
  approveRedeem,
  rejectRedeem,
} = require(
  "../controllers/redeemController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.put(
  "/approve/:id",
  protect,
  approveRedeem
);

router.put(
  "/reject/:id",
  protect,
  rejectRedeem
);
router.post(
  "/create",
  protect,
  createRedeem
);

router.get(
  "/history",
  protect,
  getRedeemHistory
);

module.exports = router;