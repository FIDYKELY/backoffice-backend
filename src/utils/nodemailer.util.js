const nodemailer = require("nodemailer");
const {
  MAIL_USER,
  MAIL_PASSWORD,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_ENCRYPTION
} = require("../config/constant");

const mailer = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: MAIL_ENCRYPTION === 'SSL', // Assurez-vous que ce soit true ou false selon le besoin
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});

module.exports = mailer;
