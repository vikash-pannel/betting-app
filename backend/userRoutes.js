const express = require("express");
const router = express.Router();

// Controllers
const userController = require("./controllers/userController");

// Middleware
const authMiddleware = require("./middleware/authMiddleware");
const adminMiddleware = require("./middleware/adminMiddleware");

// ================= PUBLIC ROUTES =================
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// ================= USER ROUTES =================
router.get("/profile", authMiddleware, userController.getUserProfile);

// ================= ADMIN ROUTES =================
router.get("/all", authMiddleware, adminMiddleware, userController.getAllUsers);

router.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  userController.deleteUser
);

router.put(
  "/update/:id",
  authMiddleware,
  adminMiddleware,
  userController.updateUser
);

module.exports = router;