const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
  try {
    // 🔐 Check: user id JWT se aaya ya nahi
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        msg: "Unauthorized: No user data",
      });
    }

    // 👤 DB se user fetch
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    // 👑 Admin check
    if (!user.isAdmin) {
      return res.status(403).json({
        msg: "Access denied: Admin only",
      });
    }

    // ✅ Sab sahi → next route
    next();
  } catch (err) {
    console.error("Admin Middleware Error:", err.message);
    res.status(500).json({
      msg: "Server error in admin middleware",
    });
  }
};

module.exports = adminMiddleware;