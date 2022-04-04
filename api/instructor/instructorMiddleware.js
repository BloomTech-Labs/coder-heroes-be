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

const getInstructorId = async (req, res, next) => {
  const instructor_id = await Instructors.findInstructorIdByProfileId(
    req.profile.profile_id
  );
  if (instructor_id) {
    req.instructor_id = instructor_id.instructor_id;
    next();
  } else {
    next({
      status: 404,
      message: 'Active profile is not an instructor',
    });
  }
};

module.exports = {
  checkInstructorExist,
  getInstructorId,
};
