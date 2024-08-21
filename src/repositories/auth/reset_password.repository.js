const { User } = require("../../models/user.model");
const randomString = require("randomstring");
const bcrypt = require("bcryptjs");
const mailer = require("../../utils/nodemailer.util");
const {
  DatabaseError,
  ServerError,
  ParamInvalidError,
} = require("../../utils/error.util");
const { API_KEY } = require("../../config/constant");

class ResetPasswordRepository {
  /**
   * Envoyer un code de confirmation de compte
   *
   * @param {string} email
   * @returns boolean
   */
  async sendResetPasswordCode(email) {
    const random_code_reset = randomString.generate(6).toLocaleUpperCase();

    const mailOption = {
      from: "contact-profily@profily.mg",
      to: email,
      subject: "Code de reinitialisation compte Profily",
      
      html: `
     <!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400&display=swap" rel="stylesheet">

	<title>Code de reinitialisation</title>
</head>
<body>
	<div class="container" style="position: relative; display: grid; background: red; padding: 60px 40px; margin: 40px; font-family: 'Poppins', sans-serif;">
		<div class="logo" style="margin: 0 auto 20px;">
			<img style="object-fit: contain; width: 350px;" src="https://profily.mg/image/logo-banner.jpg" alt="" />
		</div>
		<div class="content" style="display: grid;">
			<p style="text-align: center; color: #fff;">
				Merci de nous avoir fais confiance. 
			</p>
			<p style="text-align: center; color: #fff;">
				Voici votre code d'activation : 
			</p>

			<div class="code" style="background: #ffffff11; color: #f6bd0e; font-size: 20px; letter-spacing: .3em; text-align: center; width: 200px; margin: auto; padding: 15px; border: none; border-radius: 10px;">
				<span id="myCode">${random_code_reset}</span>
			</div>
		</div>
	</div>
</body>
</html>                
          `,
    };

    const send_email = await mailer.sendMail(mailOption);

    if (send_email) {
      const addCode = await User.updateOne(
        {
          email: email.trim(),
        },
        {
          $set: {
            reset_code: random_code_reset,
          },
        }
      );

      if (addCode) {
        return true;
      } else {
        throw new DatabaseError(
          "Impossible d'enregistrer le code de validation"
        );
      }
    } else {
      throw new ServerError("Envoi de mail de confirmation impossible");
    }
  }

  /**
   * Verifier le code de reinitialisation de mot de passe
   *
   * @param {string} email
   * @param {string} code
   * @returns boolean
   */
  async checkResetPasswordCode(email, code) {
    console.log('reset atooo')
    console.log('code:',code)
    const user = await User.findOne({
      email: email,
      reset_code: code,
    });

    if (user) {
      return true;
    } else {
      throw new ParamInvalidError("Code invalide");
    }
  }

  /**
   * Reinitialiser le mot de passe
   *
   * @param {string} email
   * @param {string} password
   * @returns boolean
   */
  async resetPassword(email, password) {
    const encrypt_passwd = await bcrypt.hash(
      password,
      process.env.API_KEY || "$2a$14$fuc6ZCGfcUmsG.GiUYmdGe"
    );

    if (encrypt_passwd) {
      const reset = await User.updateOne(
        {
          email: email,
        },
        {
          $set: {
            password: encrypt_passwd,
          },
        }
      );

      if (reset) {
        return true;
      } else {
        throw new DatabaseError("Reinitialisation de mot de passe impossible");
      }
    } else {
      throw new ServerError("Encryptage du mot de passe impossible");
    }
  }

  /**
   * Changer le mot de passe
   *
   * @param {object} dataObject
   * @returns true
   */
  async changePassword(dataObject) {
    const email = dataObject.email;
    const old_password = dataObject.password;
    const new_password = dataObject.new_password;

    const user = await User.findOne({
      email: email,
    });

    if (user) {
      const check_passwd = await bcrypt.compare(old_password, user.password);

      if (check_passwd) {
        const encrypt_new_passwd = await bcrypt.hash(new_password, API_KEY);

        if (encrypt_new_passwd) {
          const change = await User.findOneAndUpdate(
            {
              email: email,
            },
            {
              password: encrypt_new_passwd,
            }
          );

          if (change) {
            return true;
          } else {
            throw new DatabaseError("Mise a jour de mot de passe impossible");
          }
        } else {
          throw new ServerError("Encryptage du mot de passe impossible");
        }
      } else {
        throw new ParamInvalidError("Mot de passe incorrect");
      }
    } else {
      throw new DatabaseError("Verification de l'utilisateur impossible");
    }
  }
}

module.exports = ResetPasswordRepository;
