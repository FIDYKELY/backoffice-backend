const { getDataFromToken } = require("./jwt.util");

class Misc {
  /**
   * Verifier la presence d'un token (utilisateur est connecte) ou retourne un code 403 en cas d'absence
   *
   * @param {*} req
   * @param {*} res
   * @returns null
   */
  static verifyToken(req, res) {
    const token = getDataFromToken(req.headers["authorization"]);

    if (!token) {
      return res.status(401).json({
        error: "You are not authorized to access this ressource",
      });
    }

    return true;
  }
}

module.exports = Misc;
