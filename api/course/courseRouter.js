const express = require('express');
const Courses = require('./courseModel');
const authRequired = require('../middleware/authRequired');
const router = express.Router();

router.get('/', authRequired, function (req, res) {
  Courses.getCourses()
    .then((courses) => {
      res.status(200).json(courses);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:name', authRequired, function (req, res) {
  const name = String(req.params.name);
  Courses.findByName(name)
    .then((course) => {
      if (course && Object.keys(course).length !== 0) {
        res.status(200).json(course);
      } else {
        res.status(404).json({ error: 'CourseNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', authRequired, async (req, res) => {
  const course = req.body;
  if (course) {
    const subject = course.subject;
    try {
      await Courses.findByName(subject).then(async (exists) => {
        if (exists.length === 0) {
          await Courses.addCourse(course).then((inserted) =>
            res.status(200).json({
              message: 'Course created successfully!',
              course: inserted[0],
            })
          );
        } else {
          res.status(400).json({ message: 'Course already exists.' });
        }
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(404).json({ message: 'Course details missing.' });
  }
});

router.put('/', authRequired, (req, res) => {
  const { subject } = req.body;
  Courses.findByName(subject)
    .then((course) => {
      Courses.updateCourse(course[0].subject, req.body)
        .then((updated) => {
          res.status(200).json({
            message: 'Course updated successfully.',
            course: updated[0],
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: `Could not update course: '${subject}'.`,
            error: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: `Could not find course: '${subject}'`,
        error: err.message,
      });
    });
});

router.delete('/:name', authRequired, (req, res) => {
  const name = req.params.name;
  try {
    Courses.findByName(name).then((course) => {
      Courses.removeCourse(course[0].subject).then(() => {
        res.status(200).json({
          message: `course '${course[0].subject}' was deleted.`,
          course: course,
        });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete course with name: ${name}.`,
      error: err.message,
    });
  }
});

module.exports = router;
