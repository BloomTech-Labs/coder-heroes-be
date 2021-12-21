const Instructors = require('./instructorModel');

const checkInstructorExist = async (req, res, next) => {
  const instructor_id = req.params.instructor_id;
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

module.exports = {
  checkInstructorExist,
};
