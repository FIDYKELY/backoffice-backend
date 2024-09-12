// routes/payments.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')('pk_test_51NzK6iARIo3qbRy8csc4mnZYnZ8apnF5HP3UyIJOcAXKScUeP5qSQcTuvZ3vYE2FKxrVnQE9zqsZo9SsvpIVQqB700LAwbcyQb'); // Replace with your Stripe secret key

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
