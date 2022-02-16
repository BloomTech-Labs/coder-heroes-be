const express = require('express');
const authRequired = require('../middleware/authRequired');
const ownerAuthorization = require('../middleware/ownerAuthorization');
const Instructors = require('./instructorModel');
const router = express.Router();
const {
  checkInstructorExist,
  checkInstructorObject,
} = require('./instructorMiddleware');

router.get('/', authRequired, function (req, res) {
  Instructors.getInstructors()
    .then((instructorList) => {
      res.status(200).json(instructorList);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get(
  '/:instructor_id',
  authRequired,
  checkInstructorExist(true),
  function (req, res, next) {
    try {
      res.status(200).json(req.instructor);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:instructor_id/classes',
  authRequired,
  checkInstructorExist(true),
  function (req, res, next) {
    try {
      Instructors.findInstructorCourses(req.params.instructor_id).then(
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

router.post('/', checkInstructorObject, async (req, res) => {
  const instructor = req.body;
  if (instructor) {
    const { profile_id } = instructor;
    try {
      await Instructors.findByProfileId(profile_id).then(async (user) => {
        if (user.length === 0) {
          await Instructors.addInstructor(instructor).then((inserted) =>
            res
              .status(200)
              .json({ message: 'Instructor added.', instructor: inserted[0] })
          );
        } else {
          res.status(400).json({ message: 'Instructor already exists.' });
        }
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(404).json({ message: 'Instructor details missing.' });
  }
});

router.put(
  '/',
  authRequired,
  checkInstructorObject,
  checkInstructorExist(false),
  ownerAuthorization('instructor'),
  (req, res) => {
    const instructor = req.body;
    if (instructor) {
      const { instructor_id } = instructor;
      Instructors.findByInstructorId(instructor_id)
        .then(
          Instructors.updateInstructor(instructor_id, instructor)
            .then((updated) => {
              res.status(200).json({
                message: `Instructor with id: ${instructor_id} updated`,
                instructor: updated[0],
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: `Could not update instructor '${instructor_id}'`,
                error: err.message,
              });
            })
        )
        .catch((err) => {
          res.status(404).json({
            message: `Could not find instructor '${instructor_id}'`,
            error: err.message,
          });
        });
    }
  }
);

router.delete(
  '/:instructor_id',
  authRequired,
  checkInstructorExist(true),
  ownerAuthorization('instructor'),
  (req, res) => {
    const { instructor_id } = req.instructor;
    try {
      Instructors.removeInstructor(instructor_id).then(() => {
        res.status(200).json({
          message: `Instructor with id:'${instructor_id}' was deleted.`,
          instructor: req.instructor,
        });
      });
    } catch (err) {
      res.status(500).json({
        message: `Could not delete instructor with ID: ${instructor_id}`,
        error: err.message,
      });
    }
  }
);

router.use('*', errorhandler);
//eslint-disable-next-line
function errorhandler(err, req, res, next) {
  res.status(err.status || 500).json(err.message);
}

module.exports = router;
