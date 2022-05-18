const express = require('express');
const authRequired = require('../middleware/authRequired');
const Classroom = require('./classroomModel');
const router = express.Router();

router.get('/students/:course_id', authRequired, function (req, res) {
  const course_id = parseInt(req.params.course_id);
  console.log(`${course_id} called here`);
  Classroom.getStudentsByClassId(course_id)
    .then((students) => {
      console.log('here');
      res.status(200).json(students);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/badges', authRequired, function (req, res, next) {
  Classroom.getBadges()
    .then((badges) => {
      res.status(200).json(badges);
    })
    .catch(next);
});

router.get('/badges/:child_id', authRequired, function (req, res, next) {
  const child_id = parseInt(req.params.child_id);
  Classroom.getBadgesByChildId(child_id)
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
