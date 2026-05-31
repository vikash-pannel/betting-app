const registerValidation = (req, res, next) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(400).json({ message: "All fields required ❌" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password min 6 chars ❌" });
  }

  next();
};

const loginValidation = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields required ❌" });
  }

  next();
};

module.exports = { registerValidation, loginValidation };