const { getDataFromToken } = require("../utils/jwt.util");

module.exports = (req, res, next) => {
    const token = getDataFromToken(req.headers["authorization"]);

    if (!token) {
      return res.status(401).json({
        error: "You are not authorized to access this ressource",
      });
    }

    next();
}