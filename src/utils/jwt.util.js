const jwt = require("jsonwebtoken");
const { TOKEN_KEY, TOKEN_EXPIRE } = require("../config/constant");
const { ServerError } = require("./error.util");

module.exports = {
  generateToken(user) {
    if (user) {
      try {
        return jwt.sign(
          {
            user_id: user._id,
            user_email: user.email,
          },
          TOKEN_KEY,
          {
            expiresIn: TOKEN_EXPIRE,
          }
        );
      } catch (error) {
        throw new ServerError("Generation de token error: " + error);
      }
    } else {
      return;
    }
  },
  parseToken(authorization) {
    return authorization != null ? authorization.replace("Bearer ", "") : null;
  },
  getDataFromToken(authorization) {
    const token = module.exports.parseToken(authorization);
    if (token) {
      try {
        return jwt.verify(token, TOKEN_KEY);
      } catch (error) {
        throw new ServerError("Verification de token error: " + error);
      }
    } else {
      return;
    }
  },
};
