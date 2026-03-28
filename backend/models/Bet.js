const mongoose = require("mongoose");

const betSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
    },

    team: String, // teamA / teamB
    amount: Number,

    status: {
      type: String,
      enum: ["pending", "won", "lost"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bet", betSchema);