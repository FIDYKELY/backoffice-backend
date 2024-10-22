const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51NzK6iARIo3qbRy8ndPdK8zcesMu73pf6vw5eqoabsd1O0phZMLYGfcmq2rlVb8daffaunprE2Mv3rjfXHuAPQ2Q00JxA4eORi'); // Clé Stripe
// const { Payment, PaymentProduct } = require('../models'); // Assure-toi que les modèles Sequelize sont définis
const Payment = require('../models/payment');
// const PaymentProduct = require('../models/paymentProduct');


// Route pour créer une intention de paiement Stripe
router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  // Arrondir et convertir le montant en entier
  const integerAmount = Math.round(amount * 100); // Multiplier par 100 pour passer à centimes et arrondir

  try {
      const paymentIntent = await stripe.paymentIntents.create({
          amount: integerAmount, // Montant en centimes
          currency: 'eur',
      });

      res.send({
          clientSecret: paymentIntent.client_secret,
      });
  } catch (error) {
      console.error('Erreur lors de la création de l\'intention de paiement:', error);
      res.status(500).send({ error: 'Erreur lors de la création de l\'intention de paiement: ' + error.message });
  }
});


// Route pour sauvegarder les détails du paiement
router.post('/savePaymentDetails', async (req, res) => {
  const { paymentId, userId, totalAmount, paymentMethod, products } = req.body;

  try {
    // Insérer les détails du paiement dans la base de données pour chaque produit
    for (const product of products) {
      await Payment.create({
        payment_id: paymentId,
        user_id: userId,
        total_amount: totalAmount,
        payment_method: paymentMethod,
        product_id: product.productId, // Enregistrez le product_id
        quantity: product.quantity,     // Enregistrez la quantité
        price: product.price,           // Enregistrez le prix
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du paiement:', error);
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement du paiement' });
  }
});
// Route pour récupérer le nombre total de ventes et le montant total des ventes
router.get('/total-sales', async (req, res) => {
  try {
    // Récupérer le nombre total de ventes (chaque enregistrement de paiement compte comme une vente)
    const totalSales = await Payment.count();

    // Calculer le montant total des ventes (en additionnant les total_amount)
    const totalAmount = await Payment.sum('total_amount');

    res.json({ totalSales, totalAmount });
  } catch (error) {
    console.error('Erreur lors de la récupération du nombre total de ventes et du montant:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du nombre total de ventes et du montant' });
  }
});


module.exports = router;
