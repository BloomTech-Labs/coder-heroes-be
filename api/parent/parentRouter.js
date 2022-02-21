const express = require('express');
const authRequired = require('../middleware/authRequired');
const ownerAuthorization = require('../middleware/ownerAuthorization');
const Parents = require('./parentModel');
const router = express.Router();

router.get('/:profile_id/children', authRequired, function (req, res) {
  const id = req.params.profile_id;

  Parents.getParentChildren(id)
    .then((children) => {
      if (children) {
        res.status(200).json(children);
      } else {
        res.status(404).json({ error: 'ParentChildrenNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/:profile_id/schedules', authRequired, function (req, res) {
  const { profile_id } = req.params;
  Parents.getChildSchedules(profile_id)
    .then((schedules) => {
      if (schedules) {
        res.status(200).json(schedules);
      } else {
        res.status(404).json({ error: 'ChildSchedulesNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
