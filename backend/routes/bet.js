const express = require("express");
const router = express.Router();

const Bet = require("../models/Bet");
const Match = require("../models/Match");
const User = require("../models/User");

const authMiddleware = require("../middleware/authMiddleware");

// 🎯 Place Bet
router.post("/place", authMiddleware, async (req, res) => {
  try {
    const { matchId, team, amount } = req.body;

    const match = await Match.findById(matchId);

    if (!match || match.status !== "live") {
      return res.status(400).json({ msg: "Match not live" });
    }

    const user = await User.findById(req.user.id);

    if (user.coins < amount) {
      return res.status(400).json({ msg: "Not enough coins" });
    }

    // deduct coins
    user.coins -= amount;
    await user.save();

    // save bet
    const bet = await Bet.create({
      user: user._id,
      match: matchId,
      team,
      amount,
    });

    res.json({ msg: "Bet placed", bet });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;