const jwt = require("jsonwebtoken");
const { TOKEN_KEY, TOKEN_EXPIRE } = require("../config/constant"); // Assurez-vous d'importer TOKEN_EXPIRE ici
const { ServerError } = require("./error.util");

module.exports = {
  generateToken(user) {
    if (user) {
      try {
        return jwt.sign(
          {
            user_id: user.id,
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
    const token = authorization ? authorization.replace("Bearer ", "") : null;
    console.log("Token extrait:", token); // Debug log
    return token;
  },
  getDataFromToken(authorization) {
    const token = module.exports.parseToken(authorization);
    if (token) {
      try {
        const decoded = jwt.verify(token, TOKEN_KEY);
        console.log("Données décodées:", decoded); // Debug log
        return decoded;
      } catch (error) {
        throw new ServerError("Verification de token error: " + error);
      }
    } else {
      return;
    }
  },
};
