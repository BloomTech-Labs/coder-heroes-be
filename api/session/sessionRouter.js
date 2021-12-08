const express = require('express');
const authRequired = require('../middleware/authRequired');
const Session = require('./sessionModel');
const router = express.Router();
// eslint-disable-next-line
router.get('/', authRequired, async function (req, res, next) {
  try {
    const allAvailableSessions = await Session.getSessions();
    res.status(200).json(allAvailableSessions);
  } catch (error) {
    next({
      status: 500,
      message: 'something went wrong while getting sessions',
    });
  }
});

module.exports = router;
