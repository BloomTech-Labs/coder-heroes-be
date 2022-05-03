const express = require('express');
const authRequired = require('../middleware/authRequired');
const Instructors = require('./instructorModel');
const router = express.Router();
const {
  getInstructorId,
  checkInstructorExist,
} = require('./instructorMiddleware');

router.get('/courses', authRequired, getInstructorId, (req, res, next) => {
  Instructors.findInstructorCourses(req.instructor_id)
    .then((courses) => {
      if (courses) {
        res.status(200).json(courses);
      } else {
        res.status(404).json({ error: 'You do not have any active courses.' });
      }
    })
    .catch(next);
});

router.get(
  '/:instructor_id',
  authRequired,
  checkInstructorExist,
  (req, res) => {
    if (req.instructor) {
      res.status(200).json(req.instructor);
    } else {
      res.status(404).json({ error: 'Instructor not found.' });
    }
  }
);

router.use('*', errorhandler);
//eslint-disable-next-line
function errorhandler(err, req, res, next) {
  res.status(err.status || 500).json(err.message);
}

module.exports = router;
