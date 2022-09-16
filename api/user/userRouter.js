const express = require('express');
const authRequired = require('../middleware/authRequired');
const Profiles = require('../profile/profileModel');
const User = require('./userModel');
const router = express.Router();

/* Create a new User (register). */
router.post('/register', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const { role_id, email, firstName, lastName } = req.body;
  const user = {
    role_id,
    email,
    name: firstName + ' ' + lastName,
    pending: false,
  };

  // TO-DO: Middleware to check req.body
  // TO-DO: Middleware to check if it already exists in db

  // TO-DO: Implement Auth0 -> new user
  Profiles.create(user)
    .then((user) => {
      res.status(201);
      res.send(user);
    })
    .catch((err) => {
      res.status(400);
      res.send(err);
    });
});

router.get('/', authRequired, function (req, res) {
  // TO-DO: Implement Auth0 to check logged in (middleware) then use req.profile from what is received back
  // const { role_id, profile_id } = req.profile;

  User.findUserData(role_id, profile_id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/schedules', authRequired, function (req, res) {
  const { profile_id } = req.profile;
  User.getSchedule(profile_id)
    .then((schedule) => {
      res.status(200).json(schedule);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.put('/', authRequired, function (req, res) {
  const { profile_id } = req.profile;
  User.updateUserData(profile_id, req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
