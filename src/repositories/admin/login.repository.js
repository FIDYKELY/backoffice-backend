// const {User} = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("../../utils/jwt.util");
const { UserNotFoundError } = require("../../utils/error.util");
const { Account } = require("../../models/admin/account.model");

class AdminLoginRepository {
  /**
   * Authentifier un utilisateur par son email
   *
   * @param {string} email
   * @param {string} password
   *
   * @return Object l'utilisateur et un jeton ou une erreur et donnee vide
   */
  async login(email, password) {
    try {
      
      const user = await Account.findOne({
        where: { 
          email: email
        },
      });
     
  
      if (user) {
        const get_passwd = await bcrypt.compare(password, user.password);
        if (get_passwd) {
          return { data: user, token: jwt.generateToken(user) };
        } else {
          throw new UserNotFoundError("Email ou mot de passe incorrecte");
        }
      } else {
        console.log(user);
        throw new UserNotFoundError("Compte introuvable");
      }
    } catch (error) {
      throw error; // Répéter l'erreur pour la gérer au niveau supérieur si nécessaire
    }
  }
  
}

module.exports = AdminLoginRepository;
