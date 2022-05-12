const express = require('express');
const authRequired = require('../middleware/authRequired');
const Classroom = require('./classroomModel');
const router = express.Router();

router.get('/:course_id', authRequired, function (req, res, next) {
  const course_id = parseInt(req.params.course_id);
  res.status(201).json({ message: 'you found it!' });
  Classroom.getStudentsById(course_id)
    .then((students) => {
      res.status(200).json(students);
    })
    .catch(next);
});

router.get('/badges', authRequired, function (req, res, next) {
  Classroom.getBadges()
    .then((badges) => {
      res.status(200).json(badges);
    })
    .catch(next);
});

router.get('/:child_id/badges', authRequired, function (req, res, next) {
  Classroom.getBadgesByChildId(req.params.child_id)
    .then((badges) => {
      res.status(200).json(badges);
    })
    .catch(next);
});

router.post('/assign', authRequired, function (req, res, next) {
  const child_id = req.params.child_id;
  const badge_id = req.params.badge_id;
  Classroom.assignBadgeByIds({ child_id, badge_id })
    .then((pair) => {
      res.status(200).json(pair);
    })
    .catch(next);
});

module.exports = router;
