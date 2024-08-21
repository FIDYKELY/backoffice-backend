const router = require("express").Router();
const ResetPasswordController = require("../controllers/auth/reset_password.controller");
const RegisterController = require("../controllers/auth/register.controller");
const LoginController = require("../controllers/auth/login.controller");
const VerifyEmailController = require("../controllers/auth/verify_email.controller");
const LoginRepository = require("../repositories/auth/login.repository");
const RegisterRepository = require("../repositories/auth/register.repository");
const ResetPasswordRepository = require("../repositories/auth/reset_password.repository");
const VerifyEmailRepository = require("../repositories/auth/verify_email.repository");

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

module.exports = router;
