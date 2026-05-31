const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token ❌" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, "secret123");
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token ❌" });
  }
};

const verifyAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Admin only ❌" });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };