const express = require('express');
const Inboxes = require('./inboxModel');
const router = express.Router();
const authRequired = require('../middleware/authRequired');

router.get('/', authRequired, function (req, res) {
  Inboxes.getInboxes()
    .then((inboxList) => {
      res.status(200).json(inboxList);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:profile_id', authRequired, function (req, res) {
  const profile_id = req.params.profile_id;
  Inboxes.findByProfileId(profile_id)
    .then((inbox) => {
      if (inbox && Object.keys(inbox).length !== 0) {
        res.status(200).json(inbox);
      } else {
        res.status(404).json({ error: 'InboxNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', async (req, res) => {
  const inbox = req.body;
  if (inbox) {
    const { profile_id } = inbox;
    try {
      await Inboxes.findByProfileId(profile_id).then(async (exists) => {
        if (exists.length === 0) {
          await Inboxes.addInbox(inbox).then((inserted) =>
            res.status(200).json({
              message: 'Inbox created successfully!',
              inbox: inserted[0],
            })
          );
        } else {
          res
            .status(400)
            .json({ message: 'Inbox already exists for this user.' });
        }
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(404).json({ message: 'Inbox details missing.' });
  }
});

router.post('/messages', authRequired, async (req, res) => {
  const message = req.body;
  if (message) {
    const { inbox_id } = message;
    try {
      await Inboxes.findByInboxId(inbox_id).then(async (exists) => {
        if (exists.length != 0) {
          await Inboxes.addMessage(message).then((inserted) =>
            res.status(200).json({
              message: 'Message sent successfully!',
              sent: inserted[0],
            })
          );
        } else {
          res.status(400).json({ message: 'Inbox does not exist.' });
        }
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(404).json({ message: 'Message details missing.' });
  }
});

router.put('/', authRequired, (req, res) => {
  const { profile_id } = req.body;
  Inboxes.findByProfileId(profile_id)
    .then((inbox) => {
      Inboxes.updateInbox(inbox[0].profile_id, req.body)
        .then((updated) => {
          res.status(200).json({
            message: 'Inbox updated successfully.',
            inbox: updated[0],
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: `Could not update inbox: '${profile_id}'.`,
            error: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: `Could not find user: '${profile_id}'`,
        error: err.message,
      });
    });
});

router.delete('/:profile_id', (req, res) => {
  const profile_id = req.params.profile_id;
  try {
    Inboxes.findByProfileId(profile_id).then((inbox) => {
      Inboxes.removeInbox(inbox[0].profile_id).then(() => {
        res.status(200).json({
          message: `Inbox with profile_id: '${inbox[0].profile_id}' was deleted.`,
          inbox: inbox,
        });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete inbox with profile_id: ${profile_id}.`,
      error: err.message,
    });
  }
});

module.exports = router;
