const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUsers,
} = require("../controllers/usercontroller");

const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

// Routes
router.post("/register", register);
router.post("/login", login);
router.get("/", verifyToken, verifyAdmin, getUsers);

module.exports = router;