const Classes = require('./classInstancesModel');

const {
  verifyTimeWithoutTimeZone,
  verifyDate,
} = require('../functions/formatChecking');
const { findByInstructorId } = require('../instructor/instructorModel');
const { getAllCourseTypes } = require('../courseTypes/courseTypesModel');

const checkClassInstanceExist = async (req, res, next) => {
  const class_id = parseInt(req.params.class_id);
  try {
    const foundClassInstance = await Classes.findByClassInstanceId(class_id);
    if (!foundClassInstance) {
      next({
        status: 404,
        message: `Class Instance with id ${class_id} does not exist`,
      });
    } else {
      req.class_instance = foundClassInstance;
      next();
    }
  } catch (err) {
    next(err);
  }
};

//MIDDLEWARE BELOW NEED TO BE UPDATED BASED ON CHANGES TO CLASSES TABLE

const checkClassInstanceObject = async (req, res, next) => {
  const {
    size,
    open_seats_remaining,
    instructor_id,
    course_type_id,
    start_time,
    end_time,
    start_date,
    end_date,
    location,
  } = req.body;
  if (!size) next({ status: 400, message: 'size is required' });
  if (!open_seats_remaining)
    next({ status: 400, message: 'open_seats_remaining is required' });
  if (!instructor_id)
    next({ status: 400, message: 'instructor_id is required' });
  if (!course_type_id)
    next({ status: 400, message: 'course_type_id is required' });
  if (!start_time) next({ status: 400, message: 'start_time is required' });
  if (!end_time) next({ status: 400, message: 'end_time is required' });
  if (!start_date) next({ status: 400, message: 'start_date is required' });
  if (!end_date) next({ status: 400, message: 'end_date is required' });
  if (!location) next({ status: 400, message: 'location is required' });
  if (typeof size !== 'number')
    next({ status: 400, message: 'size must be of type number' });
  if (typeof open_seats_remaining !== 'number')
    next({
      status: 400,
      message: 'open_seats_remaining must be of type number',
    });
  if (typeof instructor_id !== 'number')
    next({ status: 400, message: 'instructor_id must be of type number' });
  if (typeof course_type_id !== 'number')
    next({ status: 400, message: 'course_type_id must be of type number' });
  if (typeof start_time !== 'string')
    next({ status: 400, message: 'start_time must be of type string' });
  if (typeof end_time !== 'string')
    next({ status: 400, message: 'end_time must be of type string' });
  if (typeof start_date !== 'string')
    next({ status: 400, message: 'start_date must be of type string' });
  if (typeof end_date !== 'string')
    next({ status: 400, message: 'end_date must be of type string' });
  if (typeof location !== 'string')
    next({ status: 400, message: 'location must be of type string' });
  if (size < 0 || size >= 2 ** 31)
    next({
      status: 400,
      message: 'size must be at least zero and less than 2^31',
    });
  if (open_seats_remaining <= -(2 ** 31) || open_seats_remaining >= 2 ** 31)
    next({
      status: 400,
      message:
        'open_seats_remaining must not have an absolute value that exceeds 2^31',
    });
  if (verifyTimeWithoutTimeZone(start_time))
    next({
      status: 400,
      message: 'start_time must be in the HH:MM:SS format and be a valid time',
    });
  if (verifyTimeWithoutTimeZone(end_time))
    next({
      status: 400,
      message: 'end_time must be in the HH:MM:SS format and be a valid time',
    });
  if (verifyDate(start_date))
    next({
      status: 400,
      message:
        'start_date must be in the YYYY-MM-DD format and be a valid date',
    });
  if (verifyDate(end_date))
    next({
      status: 400,
      message: 'end_date must be in the YYYY-MM-DD format and be a valid date',
    });
  if (location.length > 255)
    next({
      status: 400,
      message: 'the location string must not exceed a length of 255 characters',
    });

  const instructor = await findByInstructorId(instructor_id);
  if (!instructor)
    next({
      status: 400,
      message: `instructor with id ${instructor_id} does not exist`,
    });
  const courseType = await getAllCourseTypes()
    .where({ course_type_id })
    .first();
  if (!courseType)
    next({
      status: 400,
      message: `courseType with id ${course_type_id} does not exist`,
    });

  next();
};

module.exports = { checkClassInstanceExist, checkClassInstanceObject };
