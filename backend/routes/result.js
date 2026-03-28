const express = require("express");
const router = express.Router();

const Bet = require("../models/Bet");
const User = require("../models/User");
const Match = require("../models/Match");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// 🏆 Declare Result + Distribute Coins
router.post("/declare/:matchId", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { winner } = req.body;

    const match = await Match.findById(req.params.matchId);
    match.status = "finished";
    match.result = winner;
    await match.save();

    const bets = await Bet.find({ match: match._id });

    for (let bet of bets) {
      if (bet.team === winner) {
        bet.status = "won";

        const user = await User.findById(bet.user);
        user.coins += bet.amount * 2;
        await user.save();
      } else {
        bet.status = "lost";
      }

      await bet.save();
    }

    res.json({ msg: "Result declared & winnings distributed" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;