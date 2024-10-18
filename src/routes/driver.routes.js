// routes/driver.routes.js
const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');

// Routes pour les conducteurs
router.get('/drivers/all', driverController.getAllDrivers);
router.get('/drivers/:id', driverController.getDriverById);
router.post('/drivers/create', driverController.createDriver);
router.put('/drivers/:id', driverController.updateDriver);
router.delete('/drivers/:id', driverController.deleteDriver);

module.exports = router;
