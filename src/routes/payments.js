// routes/payments.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51NzK6iARIo3qbRy8ndPdK8zcesMu73pf6vw5eqoabsd1O0phZMLYGfcmq2rlVb8daffaunprE2Mv3rjfXHuAPQ2Q00JxA4eORi'); // Replace with your Stripe secret key

router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // amount in cents
      currency: 'eur',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
