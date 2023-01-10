const express = require('express');
const Inboxes = require('./inboxModel');
const router = express.Router();
const authRequired = require('../middleware/authRequired');

router.get('/', authRequired, function (req, res) {
  Inboxes.getConversations()
    .then((conversation) => {
      res.status(200).json(conversation);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:conversation_id', authRequired, function (req, res) {
  Inboxes.findByConversationId(req.params.conversation_id)
    .then((conversation) => {
      if (conversation.length) {
        res.status(200).json(conversation);
      } else {
        res.status(404).json({
          message: `Conversation ${req.params.conversation_id} does not exist.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.post('/', async (req, res) => {
  Inboxes.addConversation(req.body)
    .then((conversation) => {
      if (!req.body.profile_id) {
        res.status(401).json({ message: 'Requires profile id' });
      } else {
        res.status(201).json(conversation);
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
      res.status(500).json({ message: err.message });
    });
});

router.put('/:messages_id', authRequired, (req, res) => {
  if (!req.body.title) {
    res.status(200).json({ message: 'title is required' });
  } else if (!req.body.message) {
    res.status(200).json({ message: 'new message is required' });
  } else {
    Inboxes.updateMessage(req.params.messages_id, req.body)
      .then((resp) => {
        if (resp) {
          res.status(200).json({
            message: `Message ${req.params.messages_id} has been updated.`,
          });
        } else {
          res.status(404).json({
            message: `There is no message with messages_id ${req.params.messages_id}`,
          });
        }
        // console.log('conversation: ', conversation);
        // if (!req.params.messages_id) {
        //   res.status(404).json({ message: 'Conversation not found' });
        // } else if (!req.body) {
        //   res.status(401).json({ message: 'Please enter nessesary information' });
        // } else if (!req.body.messages_id) {
        //   res.status(401).json({ message: 'Please provide profile_id' });
        // } else {
        //   res.status(201).json(conversation);
        // }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
  }
});

router.delete('/:conversation_id', authRequired, (req, res) => {
  Inboxes.removeConversation(req.params.conversation_id)
    .then((conversation) => {
      if (conversation) {
        res.status(200).json({
          message: `Conversaton ${req.params.conversation_id} has been deleted`,
        });
      } else {
        res.status(401).json({
          message: `Conversaton ${req.params.conversation_id} not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
