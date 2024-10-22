const router = require("express").Router();
const ResetPasswordController = require("../controllers/auth/reset_password.controller");
const RegisterController = require("../controllers/auth/register.controller");
const LoginController = require("../controllers/auth/login.controller");
const VerifyEmailController = require("../controllers/auth/verify_email.controller");
const LoginRepository = require("../repositories/auth/login.repository");
const RegisterRepository = require("../repositories/auth/register.repository");
const ResetPasswordRepository = require("../repositories/auth/reset_password.repository");
const VerifyEmailRepository = require("../repositories/auth/verify_email.repository");
const { User } = require('../models/user.model');
const sequelize = require("../config/database");

// Instanciation des contrôleurs avec leurs repositories respectifs
const loginController = new LoginController(new LoginRepository());
const registerController = new RegisterController(new RegisterRepository());
const verifyEmailController = new VerifyEmailController(new VerifyEmailRepository());
const resetPasswordController = new ResetPasswordController(new ResetPasswordRepository());

/**
 * Routes pour l'authentification et la gestion des utilisateurs
 */
router.post("/login", loginController.login); // Connexion
router.post("/register", registerController.register); // Inscription
router.post("/verify_email", verifyEmailController.checkEmailVerificationCode); // Vérification de l'email
router.post("/send_verification_email_code", verifyEmailController.sendEmailVerificationCode); // Envoi du code de vérification de l'email

// Réinitialisation du mot de passe
router.post("/users/:id/settings/change_password", resetPasswordController.changePassword); 
router.post("/send_code_reset", resetPasswordController.sendResetPasswordCode); 
router.post("/send_reset_password", resetPasswordController.resetPassword);  
router.post("/check_code_reset", resetPasswordController.checkResetPasswordCode); // Correction de l'orthographe de l'URL

router.get('/users', async (req, res) => {
    try {
      const users = await User.findAll(); // Récupère tous les utilisateurs
      res.status(200).json(users); // Renvoie les utilisateurs au format JSON
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
    }
  });
  // Dans votre route pour obtenir les statistiques des utilisateurs
router.get('/users/statistic/:type', async (req, res) => {
    const statisticType = req.params.type;
  
    try {
      let users;
  
      if (statisticType === '1') { // Date
        users = await User.findAll({
          attributes: [
            [sequelize.fn('DATE', sequelize.col('createdAt')), 'date'],
            [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
          ],
          group: ['date'],
          order: [[sequelize.col('date'), 'ASC']],
        });
      } else if (statisticType === '2') { // Mois
        users = await User.findAll({
          attributes: [
            [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%Y-%m'), 'month'],
            [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
          ],
          group: ['month'],
          order: [[sequelize.col('month'), 'ASC']],
        });
      } else if (statisticType === '3') { // Année
        users = await User.findAll({
          attributes: [
            [sequelize.fn('YEAR', sequelize.col('createdAt')), 'year'],
            [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
          ],
          group: ['year'],
          order: [[sequelize.col('year'), 'ASC']],
        });
      } else {
        return res.status(400).json({ message: 'Invalid statistic type' });
      }
  
      return res.json({ data: users });
    } catch (error) {
      console.error('Error retrieving user statistics:', error); // Log l'erreur ici
      return res.status(500).json({ message: 'Internal server error', error });
    }
  });
  

module.exports = router;
