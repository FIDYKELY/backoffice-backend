const { UserNotFoundError } = require("../../utils/error.util");

class LoginController {
  constructor(repository) {
    this.repository = repository;
  }
  /**
   * Authentifier un utilisateur par son email
   *
   * @param {Request} req
   * @param {Response} res
   *
   * @return Object l'utilisateur et un jeton ou une erreur et donnee vide
   */
  login = async (req, res) => {
    const email = req.body.email;
    const mdp = req.body.password;
    try {
      console.log(email,mdp);
      const response = await this.repository.login(email,mdp);
      return res.status(200).json(response);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(404).json({ error: error.message });
      } else {
        return res.status(500).json({ error: error.message });
      }
    }
  }
}

module.exports = LoginController;
