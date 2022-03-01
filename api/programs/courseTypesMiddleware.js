const Courses = require('./courseTypesModel');

const checkIfProgramIsUnique = async (req, res, next) => {
  const { program_name } = req.body;
  const program = await Courses.findByName(program_name);
  if (program) {
    next({
      status: 400,
      message: `Program with a name of ( ${program_name} ) already exists.`,
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
  checkIfProgramIsUnique,
  checkCourseTypePayload,
};
