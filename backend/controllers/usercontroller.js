const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
const register = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      password: hashedPassword,
    });

    res.json({ message: "User registered ✅", user });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password ❌" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      "secret123",
      { expiresIn: "1d" }
    );

    res.json({ message: "Login success ✅", token });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all users (admin only)
const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

module.exports = { register, login, getUsers };