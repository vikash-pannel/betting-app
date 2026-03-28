const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/userCoins"));
app.use("/api/match", require("./routes/match"));
app.use("/api/bet", require("./routes/bet"));
app.use("/api/result", require("./routes/result"));

// API Test
app.get("/api", (req, res) => {
  res.send("API Running 🚀");
});

// Frontend build
app.use(express.static(path.join(__dirname, "frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build/index.html"));
});

// PORT
const PORT = process.env.PORT || 10000;

// DB connect + server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));