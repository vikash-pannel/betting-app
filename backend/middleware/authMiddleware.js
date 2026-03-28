const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    // Header se token lena
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ msg: "No token, access denied" });
    }

    // Token verify
    const decoded = jwt.verify(token, "secretkey");

    // req me user add
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};