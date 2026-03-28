const express = require("express");
const router = express.Router();

const Match = require("../models/Match");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// 🛠 Create Match
router.post("/create", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { teamA, teamB } = req.body;

    const match = await Match.create({ teamA, teamB });

    res.json({ msg: "Match created", match });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// 🔴 Make Live
router.put("/live/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);

    match.status = "live";
    await match.save();

    res.json({ msg: "Match is LIVE", match });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// 🏁 End Match + Result
router.put("/result/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { result } = req.body;

    const match = await Match.findById(req.params.id);
    match.status = "finished";
    match.result = result;

    await match.save();

    res.json({ msg: "Result declared", match });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;