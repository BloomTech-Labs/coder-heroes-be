const express = require('express');
const authRequired = require('../middleware/authRequired');
const Instructors = require('./instructorModel');
const router = express.Router();
const { checkInstructorExist } = require('./instructorMiddleware');

router.get(
  '/:profile_id/courses',
  authRequired,
  checkInstructorExist,
  function (req, res, next) {
    Instructors.findInstructorCourses(req.params.profile_id)
      .then((courses) => {
        if (courses) {
          res.status(200).json(courses);
        } else {
          res.status(404).json({ error: 'Instructor courses Not Found' });
        }
      })
      .catch(next);
  }
);

router.use('*', errorhandler);
//eslint-disable-next-line
function errorhandler(err, req, res, next) {
  res.status(err.status || 500).json(err.message);
}

module.exports = router;
