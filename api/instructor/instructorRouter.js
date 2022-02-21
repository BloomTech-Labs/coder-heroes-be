const express = require('express');
const authRequired = require('../middleware/authRequired');
// const ownerAuthorization = require('../middleware/ownerAuthorization');
const Instructors = require('./instructorModel');
const router = express.Router();
const { checkInstructorExist } = require('./instructorMiddleware');

router.get(
  '/:profile_id/classes',
  authRequired,
  checkInstructorExist,
  function (req, res, next) {
    try {
      Instructors.findInstructorCourses(req.params.profile_id).then(
        (classes) => {
          if (classes) {
            res.status(200).json(classes);
          } else {
            res.status(404).json({ error: 'Instructor classes Not Found' });
          }
        }
      );
    } catch (error) {
      next(error);
    }
  }
);

router.use('*', errorhandler);
//eslint-disable-next-line
function errorhandler(err, req, res, next) {
  res.status(err.status || 500).json(err.message);
}

module.exports = router;
