const express = require("express");
const router = express.Router();
const axios = require("axios");

// ✅ GET LIVE MATCHES
router.get("/live-matches", async (req, res) => {
  try {
    const response = await axios.get(
      "https://cricket-live-line1.p.rapidapi.com/liveMatches",
      {
        headers: {
          "X-RapidAPI-Key": "36c4538c48mshf03efb976f9f122p11bc25jsnde99b1826066",
          "X-RapidAPI-Host": "cricket-live-line1.p.rapidapi.com",
        },
      }
    );

    // ✅ send data
    res.json(response.data);

  } catch (error) {
    console.log("❌ API ERROR:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch matches",
      error: error.response?.data || error.message,
    });
  }
});

module.exports = router;