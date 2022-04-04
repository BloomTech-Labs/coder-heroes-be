const Instructors = require('./instructorModel');

const checkInstructorExist = async (req, res, next) => {
  const profile_id = parseInt(req.params.profile_id);
  const foundInstructor = await Instructors.findByInstructorId(profile_id);
  if (!foundInstructor) {
    next({
      status: 404,
      message: `Instructor with id ${profile_id} is not found.`,
    });
  } else {
    req.instructor = foundInstructor;
    next();
  }
};

// Retrieves the instructor id of the currently active account by way of the active account's profile id.
// req.instructor_id is set to null if the active user is not an instructor
// ../middleware/authRequired.js must be called before calling this middleware
const getInstructorId = async (req, res, next) => {
  const instructor_id = await Instructors.findInstructorIdByProfileId(
    req.profile.profile_id
  );
  if (instructor_id) {
    req.instructor_id = instructor_id.instructor_id;
    next();
  } else {
    req.instructor_id = null;
    next();
  }
};

module.exports = {
  checkInstructorExist,
  getInstructorId,
};
