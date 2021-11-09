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

module.exports = router;
