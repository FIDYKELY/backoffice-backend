const { User } = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const randomString = require("randomstring");
const jwt = require("../../utils/jwt.util");
const mailer = require("../../utils/nodemailer.util");
// const { Preference } = require("../../models/preference.model");
const { AlreadyInUseError, DatabaseError } = require("../../utils/error.util");
const { API_KEY, DEFAULT_AVATAR, MAIL_USER, MAIL_FROM_ADDRESS, MAIL_FROM_NAME } = require("../../config/constant");
const { Op } = require('sequelize');

class RegisterRepository {
  async register(dataObject) {
    try {
      // Vérification de l'existence de l'utilisateur par email ou téléphone
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [
            { email: dataObject.email },
            { phone: dataObject.phone }
          ]
        }
      });

      if (existingUser) {
        throw new AlreadyInUseError("Email or phone already in use");
      }

      // Extraction des données de l'objet
      const {
        first_name, last_name, email, phone, password, city, country,
        gender, date_of_birth, address
      } = dataObject;

      // Vérification des champs requis
      if (!first_name || !last_name || !email || !phone || !password || !city || !country || !gender || !date_of_birth) {
        throw new Error("Required fields are missing");
      }

      // Cryptage du mot de passe
      const encrypt_passwd = await bcrypt.hash(password, API_KEY);

      // Création du code de vérification
      const random_code = randomString.generate(6).toUpperCase();

      // Options de l'email de vérification
      const mailOption = {
        from: MAIL_FROM_ADDRESS, // Utilisation du MAIL_FROM_ADDRESS comme expéditeur
        to: email,
        subject: "Code de validation de compte",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400&display=swap" rel="stylesheet">
            <title>Code de validation du compte</title>
          </head>
          <body>
            <div class="container" style="position: relative; display: grid; background: #181f47; padding: 60px 40px; margin: 40px; font-family: 'Poppins', sans-serif;">
              <div class="logo" style="margin: 0 auto 20px;">
                <img style="object-fit: contain; width: 350px;" src="https://profily.mg/image/logo-banner.jpg" alt="" />
              </div>
              <div class="content" style="display: grid;">
                <p style="text-align: center; color: #fff;">
                  Merci de nous avoir fait confiance. 
                </p>
                <p style="text-align: center; color: #fff;">
                  Voici votre code de validation du compte : 
                </p>
                <div class="code" style="background: #ffffff11; color: #f6bd0e; font-size: 20px; letter-spacing: .3em; text-align: center; width: 200px; margin: auto; padding: 15px; border: none; border-radius: 10px;">
                  <span id="myCode">${random_code}</span>
                </div>
              </div>
            </div>
          </body>
          </html>
        `,
      };

      // Création de l'utilisateur
      const user = await User.create({
        first_name,
        last_name,
        email,
        password: encrypt_passwd,
        phone,
        gender,
        date_of_birth,
        city,
        country,
        address,
        verification_code: random_code,
        avatar: DEFAULT_AVATAR
      });

      // Envoi de l'email de vérification
      if (user) {
        await mailer.sendMail(mailOption);

        // Création des préférences utilisateur
        await Preference.create({
          user_id: user.id,
          param: "showPhoneNumber",
          value: false,
        });

        // Retour des données utilisateur et du token JWT
        return { data: user, token: jwt.generateToken(user) };
      } else {
        throw new DatabaseError("Création de l'utilisateur impossible");
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
      if (error.name === "AlreadyInUseError") {
        throw error;
      } else {
        throw new DatabaseError("Erreur lors de l'enregistrement");
      }
    }
  }
}

module.exports = RegisterRepository;
