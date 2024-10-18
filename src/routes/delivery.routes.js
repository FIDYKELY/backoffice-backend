const express = require('express');
const router = express.Router();
const DeliveryController = require('../controllers/deliveryController');

// Route pour assigner un livreur
router.post('/assign-driver', DeliveryController.assignDriver);

// Route pour mettre à jour la position d'un livreur
router.post('/update-location', DeliveryController.updateDriverLocation);

module.exports = router;
