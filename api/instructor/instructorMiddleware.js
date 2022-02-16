const Instructors = require('./instructorModel');

const checkInstructorExist = async (req, res, next) => {
  const profile_id = req.params.profile_id;
  const foundInstructor = await Instructors.findByInstructorId(profile_id);

  if (foundInstructor == undefined) {
    next({
      status: 404,
      message: `Instructor with id ${profile_id} is not found.`,
    });
  } else {
    req.instructor = foundInstructor;
    next();
  }
};

module.exports = {
  checkInstructorExist,
};
