const { getDataFromToken } = require("../utils/jwt.util");

module.exports = (req, res, next) => {
  const token = getDataFromToken(req.headers["authorization"]);

  if (!token) {
    return res.status(401).json({
      error: "You are not authorized to access this resource",
    });
  }

  try {
    req.user = token; // The decoded token data should be set here
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
}
