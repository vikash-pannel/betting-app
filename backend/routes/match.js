const express = require("express");
const axios = require("axios");

const router = express.Router();

// 🔥 MAIN ROUTE (IMPORTANT)
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://cricket-live-line-advance.p.rapidapi.com/matches",
      {
        params: {
          status: "3",
          per_page: "50",
          paged: "1",
          highlight_live_matches: "1",
        },
        headers: {
          "X-RapidAPI-Key": "36c4538c48mshf03efb976f9f122p11bc25jsnde99b1826066",
          "X-RapidAPI-Host": "cricket-live-line-advance.p.rapidapi.com",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.log("API ERROR:", error.response?.data || error.message);

    res.status(500).json({
      error: "API failed",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;