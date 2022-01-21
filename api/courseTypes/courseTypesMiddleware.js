const Courses = require('./courseTypesModel');

const checkIfCourseIsUnique = async (req, res, next) => {
  const { subject } = req.body;
  const course = await Courses.findBySubject(subject);
  if (course) {
    next({
      status: 404,
      message: `Course with a name of ( ${subject} ) already exists.`,
    });
  } else {
    next();
  }
};
const checkCoursePyload = (req, res, next) => {
  let { description, subject } = req.body;
  if (typeof description !== 'string')
    next({ status: 400, message: 'description must be of type string' });
  if (typeof subject !== 'string')
    next({ status: 400, message: 'subject must be of type string' });
  description = description.trim();
  subject = subject.trim();
  req.body = { description, subject };
  if (!description) next({ status: 400, message: 'description is required' });
  if (!subject) next({ status: 400, message: 'subject is required' });
  if (description.length > 255)
    next({
      status: 400,
      message:
        'the description string must not exceed a length of 255 characters',
    });
  if (subject.length > 255)
    next({
      status: 400,
      message: 'the subject string must not exceed a length of 255 characters',
    });

  next();
};

module.exports = {
  checkIfCourseIsUnique,
  checkCoursePyload,
};
