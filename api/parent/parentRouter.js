const express = require('express');
const authRequired = require('../middleware/authRequired');
const Parents = require('./parentModel');
const Children = require('../children/childrenModel');
const router = express.Router();

router.post('/', authRequired, async function (req, res, next) {
  const { profile_id } = req.profile;
  try {
    let child = await Children.addChild(profile_id, req.body);
    res.status(201).json(child);
  } catch (error) {
    next(error);
  }
});

router.get('/:profile_id/children', authRequired, function (req, res) {
  const { profile_id } = req.params;

  Parents.getParentChildren(profile_id)
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
