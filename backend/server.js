const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// ✅ Middlewares
app.use(express.json());
app.use(cors({
  origin: "*"
}));

// ================= ROUTES =================

// Auth
app.use("/api/auth", require("./routes/auth"));

// Coins
app.use("/api/user", require("./routes/userCoins"));

// Match
app.use("/api/match", require("./routes/match"));

// Bet
app.use("/api/bet", require("./routes/bet"));

// Result
app.use("/api/result", require("./routes/result"));

// ==========================================

// ✅ API Test
app.get("/api", (req, res) => {
  res.send("API Running 🚀");
});

// ================= FRONTEND BUILD =================

// 👇 IMPORTANT: build folder serve karega
app.use(express.static(path.join(__dirname, "frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build/index.html"));
});

// ================================================

// ✅ DB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// ✅ PORT
const PORT = process.env.PORT || 5000;

// ✅ Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});