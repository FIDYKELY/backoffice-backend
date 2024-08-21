// const db = require("mysql");
// const { DB_CONNECTION } = require("./constant");

// /**
//  * Connect to the mongodb database
//  */
// db.connect(
//   DB_CONNECTION,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (error) => {
//     if (!error) console.log("MongoDB server connected");
//     else
//       console.error(
//         "MongoDB [server] connection error [YOU NEED TO CHECK YOUR DB CONFIG] [ERROR]: " +
//           error
//       );
//   }
// );

// db.Promise = global.Promise;

// const connection = db.connection;

// connection.once("open", () => {
//   console.log("MongoDB connection openned");
// });
const Sequelize = require("sequelize");
const mysql = require("mysql2");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    underscored: true,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion à la base de données MySQL établie avec succès");
  })
  .catch((error) => {
    console.error(
      "Erreur lors de la connexion à la base de données MySQL :",
      error
    );
  });

module.exports = sequelize;
