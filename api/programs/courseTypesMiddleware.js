const Courses = require('./courseTypesModel');
const { programSchema } = require('./programSchema');
const createError = require('http-errors');

const checkIfProgramIsUnique = async (req, res, next) => {
  const { program_name } = req.body;
  const program = await Courses.getByName(program_name);
  if (program) {
    next({
      status: 400,
      message: `Program with a name of ( ${program_name} ) already exists.`,
    });
  } else {
    next();
  }
};

const validateProgramObject = async (req, res, next) => {
  try {
    const validatedProgram = await programSchema.validate(req.body, {
      strict: false,
      stripUnknown: true,
    });
    req.body = validatedProgram;
    next();
  } catch (err) {
    next(createError(422, err.message));
  }
};

module.exports = {
  checkIfProgramIsUnique,
  validateProgramObject,
};
