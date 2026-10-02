const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (
      !header ||
      !header.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      message:
        "Invalid or expired authentication token.",
    });
  }
};

const adminOnly = (req, res, next) => {
  if (
    !req.user ||
    req.user.role !== "admin"
  ) {
    return res.status(403).json({
      message: "Admin access required.",
    });
  }

  next();
};

module.exports = {
  protect,
  adminOnly,
};