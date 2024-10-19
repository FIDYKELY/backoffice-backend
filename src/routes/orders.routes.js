const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

// Route pour récupérer toutes les commandes
router.get('/orders', OrderController.getAllOrders);

// Route pour récupérer une commande spécifique par ID
router.get('/orders/:id', OrderController.getOrderById);

// Route pour créer une nouvelle commande
router.post('/orders', OrderController.createOrder);

// Route pour mettre à jour une commande existante
router.put('/orders/:id', OrderController.updateOrder);

// Route pour supprimer une commande
router.delete('/orders/:id', OrderController.deleteOrder);

module.exports = router;
