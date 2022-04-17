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

router.get('/user', authRequired, function (req, res) {
  Inboxes.findByInboxId(req.profile.profile_id)
    .then((inbox) => {
      if (!req.profile.profile_id) {
        res.status(404).json({ message: 'Inbox not found' });
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
      if (!req.body.profile_id) {
        res.status(401).json({ message: 'Requires profile id' });
      } else {
        res.status(201).json(inbox);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.post('/messages', authRequired, async (req, res) => {
  Inboxes.addMessage(req.body)
    .then((message) => {
      if (!req.body) {
        res.status(401).json({ message: 'Please enter nessesary information' });
      } else if (!req.body.title.trim()) {
        res.status(401).json({ message: 'Please enter a title' });
      } else if (!req.body.message.trim()) {
        res.status(401).json({ message: 'Please enter a message' });
      } else {
        res.status(201).json(message);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.put('/:profile_id', authRequired, (req, res) => {
  Inboxes.updateInbox(req.params.profile_id, req.body)
    .then((inbox) => {
      if (!req.params.profile_id) {
        res.status(404).json({ message: 'Inbox not found' });
      } else if (!req.body) {
        res.status(401).json({ message: 'Please enter nessesary information' });
      } else if (!req.body.profile_id) {
        res.status(401).json({ message: 'Please provide profile_id' });
      } else {
        res.status(201).json(inbox);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.delete('/:profile_id', authRequired, (req, res) => {
  Inboxes.removeInbox(req.params.profile_id)
    .then((inbox) => {
      if (!req.params.profile_id) {
        res.status(401).json({ message: 'Inbox not found' });
      } else {
        res.status(200).json(inbox);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
