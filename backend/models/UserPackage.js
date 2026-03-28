const mongoose = require("mongoose");

const userPackageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  match: { type: mongoose.Schema.Types.ObjectId, ref: "Match" },
});

module.exports = mongoose.model("UserPackage", userPackageSchema);