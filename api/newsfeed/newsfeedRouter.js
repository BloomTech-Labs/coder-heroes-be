const express = require('express');
const authRequired = require('../middleware/authRequired');
const Newsfeed = require('./newsfeedModel');
const router = express.Router();

router.get('/', authRequired, function (req, res) {
  Newsfeed.getNewsfeed()
    .then((feed) => {
      res.status(200).json(feed);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:newsfeed_id', authRequired, function (req, res) {
  Newsfeed.findByNewsfeedId(req.params.newsfeed_id)
    .then((feed) => {
      if (!feed) {
        res.status(404).json({ error: 'Newsfeed Not Found' });
      } else {
        res.status(200).json(feed);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.post('/', authRequired, (req, res) => {
  Newsfeed.addNewsfeed(req.body)
    .then((newFeed) => {
      res.status(201).json(newFeed);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.put('/:newsfeed_id', authRequired, (req, res) => {
  Newsfeed.updateNewsfeed(req.params.newsfeed_id, req.body)
    .then((updatedFeed) => {
      if (updatedFeed) {
        res.status(200).json(updatedFeed[0].description);
      } else {
        res.status(401).json({ message: 'Feed not Found' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.delete('/:newsfeed_id', (req, res) => {
  Newsfeed.removeNewsfeed(req.params.newsfeed_id)
    .then((deletedFeed) => {
      res.status(200).json(deletedFeed);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
