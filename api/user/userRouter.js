const express = require('express');

const Profiles = require('../profile/profileModel');
const User = require('./userModel');
const router = express.Router();
const oktaClient = require('../../lib/oktaClient');

/* Create a new User (register). */
router.post('/register', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const newUser = {
    profile: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      login: req.body.email,
    },
  };
  oktaClient
    .createUser(newUser)
    .then((user) => {
      return Profiles.create({
        email: user.profile.email,
        name: user.profile.firstName + ' ' + user.profile.lastName,
        okta_id: user.id,
        role_id: req.body.role_id,
        pending: false,
      }).then(() => user);
    })
    .then((user) => {
      res.status(201);
      res.send(user);
    })
    .catch((err) => {
      res.status(400);
      res.send(err);
    });
});

router.get('/', function (req, res) {
  const { role_id, profile_id } = req.profile;
  User.findUserData(role_id, profile_id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/schedules', function (req, res) {
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

router.put('/', function (req, res) {
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
