const express = require('express');
const authRequired = require('../middleware/authRequired');
const Profiles = require('../profile/profileModel');
const User = require('./userModel');
const router = express.Router();

router.get('/', authRequired, function (req, res) {
  const { okta } = req.profile;
  Profiles.findById(okta).then((profile) => {
    const { type } = profile;
    User.findUserData(type, okta)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
  });
});

router.get('/inbox', authRequired, function (req, res) {
  const { okta } = req.profile;
  Profiles.findById(okta).then((user) => {
    User.getInbox(user.okta)
      .then((inbox) => {
        res.status(200).json(inbox);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
  });
});

router.get('/schedules', authRequired, function (req, res) {
  const { okta } = req.profile;
  Profiles.findById(okta).then((user) => {
    User.getSchedule(user.okta)
      .then((schedule) => {
        res.status(200).json(schedule);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
  });
});

module.exports = router;
