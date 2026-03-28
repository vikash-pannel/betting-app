const express = require("express");
const router = express.Router();

const Match = require("../models/Match");
const Bet = require("../models/Bet");

// ✅ middleware import (IMPORTANT)
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");


// 🔥 TEST ROUTE (check admin working or not)
router.get("/test", auth, admin, (req, res) => {
  res.json({
    message: "Admin route working ✅",
    user: req.user
  });
});


// 🔥 CREATE MATCH (ADMIN ONLY)
router.post("/create-match", auth, admin, async (req, res) => {
  try {
    const { teamA, teamB, oddsA, oddsB, startTime } = req.body;

    const match = new Match({
      teamA,
      teamB,
      oddsA,
      oddsB,
      startTime
    });

    await match.save();

    res.json({
      message: "Match created successfully ✅",
      match
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 🔥 ALL MATCHES (ADMIN)
router.get("/matches", auth, admin, async (req, res) => {
  try {
    const matches = await Match.find().sort({ createdAt: -1 });

    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 🔥 ALL BETS (ADMIN)
router.get("/bets", auth, admin, async (req, res) => {
  try {
    const bets = await Bet.find()
      .populate("user", "email")
      .populate("match");

    res.json(bets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;