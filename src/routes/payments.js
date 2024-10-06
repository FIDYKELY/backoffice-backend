const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51NzK6iARIo3qbRy8ndPdK8zcesMu73pf6vw5eqoabsd1O0phZMLYGfcmq2rlVb8daffaunprE2Mv3rjfXHuAPQ2Q00JxA4eORi'); // Clé Stripe
// const { Payment, PaymentProduct } = require('../models'); // Assure-toi que les modèles Sequelize sont définis
const Payment = require('../models/payment');
const PaymentProduct = require('../models/paymentProduct');


// Route pour créer une intention de paiement Stripe
router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Montant en centimes
      currency: 'eur',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Route pour sauvegarder les détails du paiement
router.post('/savePaymentDetails', async (req, res) => {
  const { paymentId, userId, totalAmount, paymentMethod, products } = req.body;

  try {
    // Insérer les détails du paiement dans la base de données
    const payment = await Payment.create({
      payment_id: paymentId,
      user_id: userId,
      total_amount: totalAmount,
      payment_method: paymentMethod,
    });

    // Insérer les produits achetés
    for (const product of products) {
      await PaymentProduct.create({
        payment_id: payment.id,
        product_id: product.productId,
        quantity: product.quantity,
        price: product.price,
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du paiement:', error);
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement du paiement' });
  }
});

module.exports = router;
