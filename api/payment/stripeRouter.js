const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/payments', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd',
  };

  return stripe.charges.create(body, (stripeERR, stripeRes) => {
    if (stripeERR) {
      res.status(500).send({ error: stripeERR });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});

module.exports = router;
