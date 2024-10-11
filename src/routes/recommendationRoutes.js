const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

// Route pour obtenir des recommandations pour un utilisateur donné
router.get('/:userId', recommendationController.recommendProducts);

module.exports = router;
