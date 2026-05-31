const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// MongoDB connect
mongoose
  .connect("mongodb://127.0.0.1:27017/betting-panel")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// Server start
const PORT = 5000;

app.listen(PORT, () => {
  console.log(Server running on port ${PORT} 🚀);
});