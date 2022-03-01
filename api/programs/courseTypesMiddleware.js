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

const checkProgramExists = async (req, res, next) => {
  try {
    const program = await Courses.getById(Number(req.params.id));
    if (program) {
      next();
    } else {
      next(createError(404, `Program with id ${req.params.id} not found.`));
    }
  } catch (err) {
    next(err);
  }
};
module.exports = {
  checkIfProgramIsUnique,
  validateProgramObject,
  checkProgramExists,
};
