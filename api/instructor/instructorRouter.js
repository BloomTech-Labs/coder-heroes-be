const express = require('express');
const authRequired = require('../middleware/authRequired');
const Instructors = require('./instructorModel');
const router = express.Router();

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

router.get('/:instructor_id', authRequired, function (req, res) {
  const instructor_id = String(req.params.instructor_id);
  Instructors.findByInstructorId(instructor_id)
    .then((instructor) => {
      if (instructor) {
        res.status(200).json(instructor);
      } else {
        res.status(404).json({ error: 'Instructor Not Found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/:instructor_id/classes', authRequired, function (req, res) {
  const instructor_id = String(req.params.instructor_id);
  Instructors.findInstructorCourses(instructor_id)
    .then((classes) => {
      if (classes) {
        res.status(200).json(classes);
      } else {
        res.status(404).json({ error: 'Instructor classes Not Found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', async (req, res) => {
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

router.put('/', authRequired, (req, res) => {
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
});

router.delete('/:instructor_id', (req, res) => {
  const instructor_id = req.params.instructor_id;
  try {
    Instructors.findByInstructorId(instructor_id).then((instructor) => {
      Instructors.removeInstructor(instructor[0].instructor_id).then(() => {
        res.status(200).json({
          message: `Instructor with id:'${instructor_id}' was deleted.`,
          instructor: instructor[0],
        });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete instructor with ID: ${instructor_id}`,
      error: err.message,
    });
  }
});

module.exports = router;
