const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes import
const matchRoutes = require("./routes/match");

// ✅ Routes use
app.use("/api/matches", matchRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ✅ Server start
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});