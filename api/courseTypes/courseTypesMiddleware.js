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
const checkCoursePyload = (req, res, next) => {
  const { description, subject } = req.body;
  if (description.trim() && subject.trim()) {
    next();
  } else {
    next({
      status: 400,
      message: 'please complete description and subject section.',
    });
  }
};

module.exports = {
  checkIfCourseIsUnique,
  checkCoursePyload,
};
