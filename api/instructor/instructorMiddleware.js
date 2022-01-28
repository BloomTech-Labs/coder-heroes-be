const Instructors = require('./instructorModel');

const { findByAdminId } = require('../admin/adminModel');
const { findById } = require('../profile/profileModel');

const checkInstructorExist = (fromParams) => async (req, res, next) => {
  const instructor_id = req[fromParams ? 'params' : 'body'].instructor_id;
  const foundInstructor = await Instructors.findByInstructorId(instructor_id);
  if (foundInstructor == undefined) {
    next({
      status: 404,
      message: `Instructor with id ${instructor_id} is not found.`,
    });
  } else {
    req.instructor = foundInstructor;
    next();
  }
};

const checkInstructorObject = async (req, res, next) => {
  const { rating, bio, profile_id, status, approved_by } = req.body;
  if (!rating) next({ status: 400, message: 'rating is required' });
  if (!bio) next({ status: 400, message: 'bio is required' });
  if (!profile_id) next({ status: 400, message: 'profile_id is required' });
  if (!status) next({ status: 400, message: 'status is required' });
  if (typeof rating !== 'number')
    next({ status: 400, message: 'rating must be of type number' });
  if (typeof bio !== 'string')
    next({ status: 400, message: 'bio must be of type string' });
  if (typeof profile_id !== 'number')
    next({ status: 400, message: 'profile_id must be of type number' });
  if (typeof status !== 'string')
    next({ status: 400, message: 'status must be of type string' });
  if (rating < 0 || rating >= 2 ** 31)
    next({
      status: 400,
      message: 'rating must not have an absolute value that exceeds 2^31',
    });
  if (bio.length > 255)
    next({
      status: 400,
      message: 'the bio string must not exceed a length of 255 characters',
    });
  if (status.length > 255)
    next({
      status: 400,
      message: 'the status string must not exceed a length of 255 characters',
    });
  if (approved_by) {
    if (typeof approved_by !== 'number')
      next({
        status: 400,
        message: 'approved_by must be of type number or null',
      });
    const admin = await findByAdminId(approved_by);
    if (!admin)
      next({
        status: 400,
        message: `An admin of id ${approved_by} was not found. Change approved_by to null or replace the value with a valid admin id.`,
      });
  }
  const profile = await findById(profile_id);
  if (!profile)
    next({
      status: 400,
      message: `profile with id ${profile_id} does not exist`,
    });

  next();
};

module.exports = {
  checkInstructorExist,
  checkInstructorObject,
};
