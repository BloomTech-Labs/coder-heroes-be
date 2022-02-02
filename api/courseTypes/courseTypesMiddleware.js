const Courses = require('./courseTypesModel');

const checkIfCourseIsUnique = async (req, res, next) => {
  const { subject } = req.body;
  const course = await Courses.findBySubject(subject);
  if (course) {
    next({
      status: 400,
      message: `Course with a name of ( ${subject} ) already exists.`,
    });
  } else {
    next();
  }
};

const checkCourseTypePayload = (req, res, next) => {
  const { description, subject } = req.body;
  if (description.trim() && subject.trim()) {
    next();
  } else {
    next({
      status: 400,
      message:
        'the description string must not exceed a length of 255 characters',
    });
  }
  if (subject.length > 255)
    next({
      status: 400,
      message: 'the subject string must not exceed a length of 255 characters',
    });

  next();
};

module.exports = {
  checkIfCourseIsUnique,
  checkCourseTypePayload,
};
