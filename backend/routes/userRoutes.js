const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");


// ✅ GET PROFILE (Protected)
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({
      msg: "User profile fetched",
      user
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;