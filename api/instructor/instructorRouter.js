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

router.get('/:id', authRequired, function (req, res) {
  const id = String(req.params.id);
  Instructors.findByInstructorId(id)
    .then((instructor) => {
      if (instructor) {
        res.status(200).json(instructor);
      } else {
        res.status(404).json({ error: 'InstructorNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/:id/courses', authRequired, function (req, res) {
  const id = String(req.params.id);
  Instructors.findInstructorCourses(id)
    .then((courses) => {
      if (courses) {
        res.status(200).json(courses);
      } else {
        res.status(404).json({ error: 'InstructorCoursesNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', async (req, res) => {
  const instructor = req.body;
  if (instructor) {
    const { user_id } = instructor;
    try {
      await Instructors.findByOkta(user_id).then(async (user) => {
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
    const { id } = instructor;
    Instructors.findByInstructorId(id)
      .then(
        Instructors.updateInstructor(id, instructor)
          .then((updated) => {
            res.status(200).json({
              message: `Instructor with id: ${id} updated`,
              instructor: updated[0],
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update instructor '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find instructor '${id}'`,
          error: err.message,
        });
      });
  }
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  try {
    Instructors.findByInstructorId(id).then((instructor) => {
      Instructors.removeInstructor(instructor[0].id).then(() => {
        res.status(200).json({
          message: `Instructor with id:'${id}' was deleted.`,
          instructor: instructor[0],
        });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete instructor with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
