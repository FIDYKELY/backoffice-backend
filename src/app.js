require('dotenv').config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const sequelize = require('./config/database'); // Ensure Sequelize configuration is correct
// const stripe = require('stripe')('pk_test_51NzK6iARIo3qbRy8csc4mnZYnZ8apnF5HP3UyIJOcAXKScUeP5qSQcTuvZ3vYE2FKxrVnQE9zqsZo9SsvpIVQqB700LAwbcyQb');

const routes = require("./routes");
const productRoutes = require('./routes/productRoutes');
const commentsRoutes = require('./routes/comment.routes');
const categoryRoutes = require('./routes/category.routes');
const paymentRoutes = require('./routes/payments');
const recommendationRoutes = require('./routes/recommendationRoutes');
const deliveryRoutes = require('./routes/delivery.routes');
const driverRoutes = require('./routes/driver.routes')


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
app.use('/api', paymentRoutes);
app.use('/api/recommend', recommendationRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api', driverRoutes);


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
