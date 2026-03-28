const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// GET user coins
router.get("/coins", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ coins: user.coins });
  } catch (err) {
    res.status(500).json({ msg: "Error" });
  }
});

module.exports = router;