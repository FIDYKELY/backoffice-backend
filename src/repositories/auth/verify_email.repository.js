const { User } = require("../../models/user.model");
const randomString = require("randomstring");
const mailer = require("../../utils/nodemailer.util");

const {
  DatabaseError,
  ServerError,
  ParamInvalidError,
} = require("../../utils/error.util");

class VerifyEmailRepository {
  /**
   * Envoyer un mail de confirmation
   *
   * @param {string} email
   * @returns boolean
   */
  async sendEmailVerificationCode(email) {
    const random_code = randomString.generate(6).toLocaleUpperCase();
    console.log(random_code);
    const mailOption = {
      from: "contact-profily@profily.mg",
      to: email,
      subject: "Code de vérification de compte Profily",
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
   <div class="container" style="position: relative; display: grid; background: #181f47; padding: 60px 40px; margin: 40px; font-family: 'Poppins', sans-serif;">
     <div class="logo" style="margin: 0 auto 20px;">
       <img style="object-fit: contain; width: 350px;" src="https://profily.mg/image/logo-banner.jpg" alt="" />
     </div>
     <div class="content" style="display: grid;">
       <p style="text-align: center; color: #fff;">
         Merci de nous avoir fais confiance. 
       </p>
       <p style="text-align: center; color: #fff;">
         Voici votre code de vérification : 
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

    const send_email = await mailer.sendMail(mailOption);

    if (send_email) {
      const addCode = await User.update(
        {
          verification_code: random_code,
        },
        {
          where : {email: email},
        }
      );
      if (addCode) {
        return true;
      } else {
        throw new DatabaseError("Impossible d'enregistrer le code");
      }
    } else {
      throw new ServerError("Envoi email impossible");
    }
  }

  /**
   * Verifier le code de verification
   *
   * @param {string} email
   * @param {string} code
   * @returns boolean
   */
  async checkEmailVerificationCode(email, code) {
    try {
      console.log('mandalo ato v?mail verifier');
      const user_code = await User.findOne({
        where : {
        email: email,
        verification_code: code}
      });
      console.log(user_code);
      if (user_code) {
        try {
          const rowsUpdated = await User.update(
            {
               email_verified_at: new Date(),
            },
            {
               where: {
                 email: email,
               },
               returning: true, // Ceci est nécessaire pour obtenir la ligne mise à jour
            }
          );
          console.log('enregistre date',rowsUpdated[1]);
        
          if (rowsUpdated[1] > 0) {
            return true;
          } else {
            throw new DatabaseError(
              "Impossible d'enregistrer la modification de la date de vérification"
            );
          }
        } catch (error) {
          // Gestion des erreurs
          console.error("Une erreur est survenue :", error);
          // Si une erreur survient lors de la mise à jour de l'utilisateur
          // vous pouvez le gérer ici
        
        }
      } else {
        throw new ParamInvalidError("Code invalid");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = VerifyEmailRepository;
