module.exports = {
  PORT: process.env.PORT || 8000,
  API_KEY: process.env.API_KEY || "$2a$09$ibo9QYkXcsuKIqvU6F/hou",
  TOKEN_KEY:
    process.env.TOKEN_KEY ||
    "fosdBhfid$&7dfj_sfbCGdsh@!28Hdfu&38-4ddfus38L4fjdhKdf9)3dsJd8",
  TOKEN_EXPIRE: process.env.TOKEN_EXPIRE || "365d",
  DB_CONNECTION: process.env.DB_CONNECTION || "mysql://localhost:3306/profily_db",
  MAIL_USER: process.env.MAIL_USER || "fidyfire@gmail.com",
  MAIL_PASSWORD: process.env.MAIL_PASSWORD || "Azamihackcompte1999!",
  MAIL_SERVICE: process.env.MAIL_SERVICE || "gmail",
  MAIL_HOST: process.env.MAIL_HOST || "smtp.gmail.com",
  MAIL_PORT: process.env.MAIL_PORT || 465,
  MAIL_ENCRYPTION: process.env.MAIL_ENCRYPTION || 'SSL',
  MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS || "your-email@gmail.com",
  MAIL_FROM_NAME: process.env.MAIL_FROM_NAME || "Your Name",
  DEFAULT_ADMIN_FULLNAME: "Default Admin account",
  DEFAULT_ADMIN_EMAIL: "admin.default@profily.com",
  DEFAULT_ADMIN_PASSWORD: "ProfilyAdmin2022",
  DEFAULT_ADMIN_PHONE: "00 00 00 00 00",
  DEFAULT_AVATAR: "https://example.com/default-avatar.png",
};
