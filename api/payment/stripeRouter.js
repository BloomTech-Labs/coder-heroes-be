// const stripe = require('stripe')(process.env.STRIPE_KEY);
// const router = require('express').Router();

// router.post('/payment', (req, res) => {
//     stripe.charges.create({
//         source: req.body.tokenId,
//         amount: req.body.amount,
//         currency: 'usd',
//     }, (stripeErr, stripeRes) => {
//         if(stripeErr) {
//             res.status(500).json(stripeErr)
//         } else {
//             res.status(200).json(stripeRes)
//         }
//     })
// })

// module.exports = router

//IMPLEMENTATION:
//npm i stripe   ***not "stripe-checkout" but "stripe"*** 
//import router into index
//server router
//.env file --> "STRIPE_KEY=" --> stripe test account public key