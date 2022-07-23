const Courses = require('./coursesModel');
const createError = require('http-errors');
const { courseSchema } = require('./coursesSchema');
const { findByInstructorId } = require('../instructor/instructorModel');

const checkCourseExists = async (req, res, next) => {
  const course_id = parseInt(req.params.course_id);
  try {
    const foundCourse = await Courses.findByCourseId(course_id);
    if (!foundCourse) {
      next(createError(404, `Course with id ${course_id} does not exist`));
    } else {
      req.course = foundCourse;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validateCourseObject = async (req, res, next) => {
  try {
    const validatedCourse = await courseSchema.validate(req.body, {
      strict: false,
      stripUnknown: true,
    });
    req.body = validatedCourse;
    next();
  } catch (err) {
    next(createError(422, err.message));
  }
};

const checkInstructorExists = async (req, res, next) => {
  if (req.body.instructor_id) {
    try {
      const instructor = await findByInstructorId(req.body.instructor_id);
      instructor ? next() : next(createError(404, 'instructor does not exist'));
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
};

// const checkAge = (req, res, next) => {

// }

// const checkIfCourseExist = (req, res, next) => {

// }
// const checkIfCourseFull = (req, res, next) => {

// }

module.exports = {
  checkCourseExists,
  validateCourseObject,
  checkInstructorExists,
};
