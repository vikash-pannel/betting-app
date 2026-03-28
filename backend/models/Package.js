const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
  },
  price: Number,
});

module.exports = mongoose.model("Package", packageSchema);