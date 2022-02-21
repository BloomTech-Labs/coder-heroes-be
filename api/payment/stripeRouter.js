//IMPLEMENTATION:
//npm i stripe   ***not "stripe-checkout" but "stripe"***
//import router into index
//server router
//.env file --> "STRIPE_KEY=" --> stripe test account public key

// Code only need uuid installed??( line 15) and to be uncommented

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const uuid = require('uuid');
const router = express.Router();

router.post('/pay', (req, res) => {
  const { product, token } = req.body;
  const idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: 'usd',
          customer: customer.id,
          receipt_email: token.email,
          description: product.name,
        },
        { idempotencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

module.exports = router;
