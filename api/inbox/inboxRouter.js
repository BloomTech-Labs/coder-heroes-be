const express = require('express');
const Inboxes = require('./inboxModel');
const router = express.Router();
const authRequired = require('../middleware/authRequired');

router.get('/', authRequired, function (req, res) {
  Inboxes.getInboxes()
    .then((inbox) => {
      res.status(200).json(inbox);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:profile_id', authRequired, function (req, res) {
  Inboxes.findByInboxId(req.params.profile_id)
    .then((inbox) => {
      if (!req.params.profile_id) {
        res.status(404).json({ message: 'Profile not found' });
      } else {
        res.status(200).json(inbox);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.post('/', async (req, res) => {
  Inboxes.addInbox(req.body)
    .then((inbox) => {
      res.status(201).json(inbox);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.post('/messages', authRequired, async (req, res) => {
  Inboxes.addMessage(req.body)
    .then((message) => {
      res.status(201).json(message);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.put('/:profile_id', authRequired, (req, res) => {
  Inboxes.updateInbox(req.params.profile_id, req.body)
    .then((inbox) => {
      res.status(201).json(inbox);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.delete('/:profile_id', (req, res) => {
  Inboxes.removeInbox(req.params.profile_id)
    .then((inbox) => {
      res.status(200).json(inbox);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
