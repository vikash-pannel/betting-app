const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/live-matches", async (req, res) => {
  try {
    const response = await axios.get(
      "https://cricket-live-line1.p.rapidapi.com/competitionMatches",
      {
        headers: {
          "X-RapidAPI-Key": "36c4538c48mshf03efb976f9f122p11bc25jsnde99b1826066",
          "X-RapidAPI-Host": "cricket-live-line1.p.rapidapi.com",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.log("ERROR:", error.response?.data || error.message);

    res.status(500).json({
      error: "API failed",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;