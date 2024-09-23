const { User } = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("../../utils/jwt.util");
const { UserNotFoundError } = require("../../utils/error.util");

class LoginRepository {
  /**
   * Authentifier un utilisateur par son email
   *
   * @param {string} email
   * @param {string} password
   *
   * @return Object contenant l'ID, l'email, le nom complet de l'utilisateur et un token JWT
   */
  async login(email, password) {
    try {
      // Rechercher l'utilisateur dans la base de données par email
      const user = await User.findOne({
        where: { email: email },
      });

      // Si l'utilisateur existe
      if (user) {
        // Comparer les mots de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          // Générer le token JWT
          const token = jwt.generateToken(user);
          
          // Retourner uniquement les informations essentielles (ID, email, fullname) et le token
          return {
            data: {
              id: user.id,
              email: user.email,
              fullname: `${user.first_name} ${user.last_name}`,
            },
            token
          };
        } else {
          // Mot de passe incorrect
          throw new UserNotFoundError("Email ou mot de passe incorrect");
        }
      } else {
        // Aucun utilisateur trouvé avec cet email
        throw new UserNotFoundError("Compte introuvable");
      }
    } catch (error) {
      // Propager l'erreur pour la gestion au niveau supérieur
      throw error;
    }
  }
}

module.exports = LoginRepository;
