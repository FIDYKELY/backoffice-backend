const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Comment = require('../models/comment.model'); 
const authenticateUser = require('../middlewares/checkTokenAccess.middleware');// Modèle Commentaire

// Ajouter un commentaire
router.post('/products/:id/comments', authenticateUser, async (req, res) => {
  try {
    const productId = req.params.id;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({ error: 'Le commentaire ne peut pas être vide' });
    }

    if (!req.user || !req.user.user_id) {
      return res.status(401).json({ error: 'Utilisateur non authentifié' });
    }

    const newComment = await Comment.create({
      product_id: productId,
      user_id: req.user.user_id, // Ensure you use the correct user ID
      comment,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Erreur lors de l’ajout du commentaire:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

router.get('/products/:id/comments', async (req, res) => {
    try {
      const productId = req.params.id;
      const comments = await Comment.findAll({
        where: { product_id: productId },
        order: [['createdAt', 'DESC']],
      });
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des commentaires' });
    }
  });
  

module.exports = router;
