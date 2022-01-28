const express = require('express');
const authRequired = require('../middleware/authRequired');
// const Profiles = require('../profile/profileModel');
const User = require('./userModel');
const router = express.Router();

router.get('/', authRequired, function (req, res) {
  const { role, profile_id } = req.profile;
  User.findUserData(role, profile_id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
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
