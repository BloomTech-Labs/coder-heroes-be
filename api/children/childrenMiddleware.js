const Children = require('./childrenModel');
const checkChildExist = async (req, res, next) => {
  const id = req.params.id;
  const foundChild = await Children.findByChildId(id);
  if (!foundChild) {
    next({ status: 404, message: `child with id ${id} is not found ` });
  } else {
    req.child = foundChild;
    next();
  }
};

const isChildAlreadyEnrolled = async (req, res, next) => {
  const id = req.params.id;
  const { course_id } = req.body;
  const enrolledCourses = await Children.getEnrolledCourses(id);
  const childIsEnrolled = enrolledCourses.find((item) => {
    if (course_id == item.course_id) {
      return true;
    }
  });
  if (childIsEnrolled) {
    next({ status: 400, message: 'child is already enrolled' });
  } else {
    req.wantToEnroll = { child_id: id, ...req.body, course_id: course_id };

    console.log(req.wantToEnroll);
    next();
  }
};

const checkChildObject = async (req, res, next) => {
  const { profile_id } = req.body;
  if (!profile_id) next({ status: 400, message: 'profile_id is required' });
  if (typeof profile_id !== 'number')
    next({ status: 400, message: 'profile_id must be of type number' });
  const profile = await Children.findByChildId(profile_id);
  if (!profile)
    next({
      status: 400,
      message: `profile with id ${profile_id} does not exist`,
    });

  next();
};

module.exports = {
  checkChildExist,
  isChildAlreadyEnrolled,
  checkChildObject,
};
