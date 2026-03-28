const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    teamA: {
      type: String,
      required: true,
    },
    teamB: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["upcoming", "live", "finished"],
      default: "upcoming",
    },

    result: {
      type: String, // teamA / teamB
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Match", matchSchema);