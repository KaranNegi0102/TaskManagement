const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Missing Token" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
    return res.status(401).json({ message: "Invalid Token Format" });
  }

  const token = parts[1];

  jwt.verify(token, "karan123", (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
