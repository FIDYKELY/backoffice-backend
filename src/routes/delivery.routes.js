const express = require('express');
const router = express.Router();
const DeliveryController = require('../controllers/deliveryController');

// Route pour assigner un livreur
router.post('/assign-driver', DeliveryController.assignDriver);

// Route pour mettre à jour la position d'un livreur
router.post('/update-location', DeliveryController.updateDriverLocation);
router.get('/', DeliveryController.getAllDeliveries);
router.post('/assign-driver', DeliveryController.assignDriver);
router.put('/:id/status', DeliveryController.updateDeliveryStatus);

// Route pour obtenir toutes les localisations des conducteurs
router.get('/driver-locations', DeliveryController.getDriverLocations);

// Route pour obtenir une localisation spécifique par ID
router.get('/driver-locations/:id', DeliveryController.getDriverLocationById);

// Route pour ajouter une nouvelle localisation
router.post('/driver-locations', DeliveryController.createDriverLocation);

// Route pour mettre à jour une localisation existante
router.put('/driver-locations/:id', DeliveryController.updateDriverLocation);

// Route pour supprimer une localisation
router.delete('/driver-locations/:id', DeliveryController.deleteDriverLocation);

module.exports = router;
