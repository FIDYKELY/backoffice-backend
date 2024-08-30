const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const productRoutes = require('./routes/productRoutes');
const sequelize = require('./config/database'); // Assurez-vous que votre configuration de Sequelize est correcte

const stockagePath = path.resolve(__dirname, "../stockage");

// Servir le dossier "stockage" en tant que dossier statique
app.use('/stockage', express.static(stockagePath));
app.use(cors());
app.use(require("./middlewares/header.middleware"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", routes);
app.use('/api/products', productRoutes);
const categoryRoutes = require('./routes/category.routes');
app.use('/api/categories', categoryRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Synchronisation des modèles avec la base de données
sequelize.sync()
  .then(() => {
    console.log('Modèles synchronisés. Démarrage de l\'application...');
    const http = require("http").createServer(app);
    module.exports = http;
  })
  .catch(error => {
    console.error('Erreur de synchronisation :', error);
  });
const http = require("http").createServer(app);

module.exports = http;
