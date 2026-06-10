const express = require("express");
const router = express.Router();

const {
  uploadWaste,
  getWasteHistory,
  getDashboard,
} = require("../controllers/wasteController");

const { protect } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

// Upload Image
router.post(
  "/image",
  protect,
  upload.single("image"),
  (req, res) => {

    console.log("IMAGE ROUTE HIT");
    console.log("FILE =", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    res.json({
      success: true,
      image: "/uploads/" + req.file.filename,
    });
  }
);

// Dashboard
router.get(
  "/dashboard",
  protect,
  getDashboard
);

// Upload Waste
router.post(
  "/upload",
  protect,
  uploadWaste
);

// History
router.get(
  "/history",
  protect,
  getWasteHistory
);

module.exports = router;