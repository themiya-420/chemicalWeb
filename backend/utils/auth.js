const jwt = require("jsonwebtoken");

const SECRET_KEY = "somethingSecret";

module.exports = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied." });
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.error("Token verification error:", err); // Log the error
      return res.status(403).json({ message: "Invalid token." });
    }
    req.user = user;
    next();
  });
};
