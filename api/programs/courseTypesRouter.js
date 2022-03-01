const express = require('express');
const Courses = require('./courseTypesModel');
const authRequired = require('../middleware/authRequired');
const {
  roleAuthentication,
  roles,
} = require('../middleware/roleAuthentication');
const router = express.Router();
const {
  checkCourseTypePayload,
  checkIfCourseIsUnique,
} = require('./courseTypesMiddleware');

router.get('/', authRequired, async function (req, res, next) {
  try {
    const programs = await Courses.getAllProgramTypes();
    res.status(200).json(programs);
  } catch (error) {
    next(error);
  }
});

//get  avalible course by subject name ==> this can be used by front end for making search bar too look for cource suing its name
router.get('/:id', authRequired, async function (req, res, next) {
  const id = Number(req.params.id);
  try {
    const program = await Courses.getById(id);
    if (program) {
      res.status(200).json(program);
    } else {
      next({
        status: 404,
        message: 'program with id ' + id + ' not found .',
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  checkCourseTypePayload,
  authRequired,
  roleAuthentication(...roles.slice(2)),
  checkIfCourseIsUnique,
  async (req, res, next) => {
    try {
      const newCourse = await Courses.addCourseType(req.body);
      res.status(201).json(newCourse);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/',
  authRequired,
  checkCourseTypePayload,
  async (req, res, next) => {
    const subject = req.body.subject;
    const course = await Courses.findBySubject(subject);
    try {
      if (course) {
        await Courses.updateCourseType(course.subject, req.body);
        const updatedCourse = await Courses.findBySubject(subject);
        res.status(200).json(updatedCourse);
      } else {
        next({
          status: 404,
          message: 'course with subject ( ' + subject + ' ) not found .',
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:subject', authRequired, async (req, res, next) => {
  const subject = req.params.subject;
  try {
    const course = await Courses.findBySubject(subject);
    if (course) {
      const deletedCourse = await Courses.removeCourseType(subject);
      res.status(200).json(deletedCourse);
    } else {
      next({
        status: 404,
        message: 'course with subject ( ' + subject + ' ) not found .',
      });
    }
  } catch (error) {
    next(error);
  }
});

router.use('*', errorhandler);
//eslint-disable-next-line
function errorhandler(err, req, res, next) {
  res.status(err.status || 500).json(err.message);
}

module.exports = router;
