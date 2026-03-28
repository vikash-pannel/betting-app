const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/live-matches", async (req, res) => {
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
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
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