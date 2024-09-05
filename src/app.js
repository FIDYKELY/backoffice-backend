require('dotenv').config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const sequelize = require('./config/database'); // Ensure Sequelize configuration is correct

const routes = require("./routes");
const productRoutes = require('./routes/productRoutes');
const commentsRoutes = require('./routes/comment.routes');
const categoryRoutes = require('./routes/category.routes');

// Serve the "stockage" directory as a static folder
const stockagePath = path.resolve(__dirname, "../stockage");
app.use('/stockage', express.static(stockagePath));

// Middleware
app.use(cors());
app.use(require("./middlewares/header.middleware"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route handlers
app.use("/api", routes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', commentsRoutes);

// Synchronize models with the database
sequelize.sync()
  .then(() => {
    console.log('Models synchronized. Starting the application...');
    const http = require("http").createServer(app);
    module.exports = http;
  })
  .catch(error => {
    console.error('Synchronization error:', error);
  });

const http = require("http").createServer(app);

module.exports = http;
