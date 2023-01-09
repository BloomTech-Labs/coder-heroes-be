const express = require('express');

const Instructors = require('./instructorModel');
const router = express.Router();
// const Profiles = require('../profile/profileModel');
const {
  getInstructorId,
  checkInstructorExist,
} = require('./instructorMiddleware');

/* Create a new Instructor profile */
router.post('/register', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  // const newInstructor = {
  //   profile: {
  //     firstName: req.body.firstName,
  //     lastName: req.body.lastName,
  //     email: req.body.email,
  //     login: req.body.email,
  //   },
});

// TO-DO: Implement Auth0 -> create new user
// oktaClient
//   .createUser(newInstructor)
//   .then((instructor) => {
//     return Profiles.create({
//       email: instructor.profile.email,
//       name: instructor.profile.firstName + ' ' + instructor.profile.lastName,
//       okta_id: instructor.id,
//       role_id: 3,
//       pending: true,
//     }).then(() => instructor);
//   })
//   .then((instructor) => {
//     res.status(201);
//     res.send(instructor);
//   })
//   .catch((err) => {
//     res.status(400);
//     res.send(err);
//   });

router.get('/courses', getInstructorId, (req, res, next) => {
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

router.get('/:instructor_id', checkInstructorExist, (req, res) => {
  if (req.instructor) {
    res.status(200).json(req.instructor);
  } else {
    res.status(404).json({ error: 'Instructor not found.' });
  }
});

router.use('*', errorhandler);
//eslint-disable-next-line
function errorhandler(err, req, res, next) {
  res.status(err.status || 500).json(err.message);
}

module.exports = router;
