const Classes = require('./classInstancesModel');
const createError = require('http-errors');
const { classSchema } = require('../classInstances/classSchema');
const { findByInstructorId } = require('../instructor/instructorModel');

const checkClassInstanceExists = async (req, res, next) => {
  const class_id = parseInt(req.params.class_id);
  try {
    const foundClassInstance = await Classes.findByClassInstanceId(class_id);
    if (!foundClassInstance) {
      next(
        createError(404, `Class Instance with id ${class_id} does not exist`)
      );
    } else {
      req.class_instance = foundClassInstance;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validateClassObject = async (req, res, next) => {
  try {
    const validated = await classSchema.validate(req.body, {
      strict: false,
      stripUnknown: true,
    });
    req.body = validated;
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

module.exports = {
  checkClassInstanceExists,
  validateClassObject,
  checkInstructorExists,
};
