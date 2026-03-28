const express = require("express");
const router = express.Router();
const Match = require("../models/Match");
const adminMiddleware = require("../middleware/adminMiddleware");


// ✅ Make Match LIVE
router.put("/make-live/:id", adminMiddleware, async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);

    if (!match) return res.status(404).json({ msg: "Match not found" });

    match.status = "live";
    await match.save();

    res.json({ msg: "Match is now LIVE", match });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// ❌ End Match
router.put("/end-match/:id", adminMiddleware, async (req, res) => {
  try {
    const { result } = req.body;

    const match = await Match.findById(req.params.id);

    if (!match) return res.status(404).json({ msg: "Match not found" });

    match.status = "finished";
    match.result = result;

    await match.save();

    res.json({ msg: "Match finished", match });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;