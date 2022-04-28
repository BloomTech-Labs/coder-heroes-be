const express = require('express');
const authRequired = require('../middleware/authRequired');
const Instructors = require('./instructorModel');
const router = express.Router();
const { getInstructorId } = require('./instructorMiddleware');

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

router.get('/profile/:profile_id', authRequired, (req, res) => {
  Instructors.findInstructorProfileByProfileId(req.params.profile_id)
    .then((instructor) => {
      if (instructor) {
        res.status(200).json(instructor);
      } else {
        res.status(404).json({ error: 'Instructor not found.' });
      }
    })
    .catch(errorhandler);
});

router.use('*', errorhandler);
//eslint-disable-next-line
function errorhandler(err, req, res, next) {
  res.status(err.status || 500).json(err.message);
}

module.exports = router;
