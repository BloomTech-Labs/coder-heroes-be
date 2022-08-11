const Children = require('./childrenModel');
const Course = require('../courses/coursesModel');

const checkChildExist = async (req, res, next) => {
  const { child_id } = req.params;
  const foundChild = await Children.findByChildId(child_id);
  if (!foundChild) {
    next({ status: 404, message: `child with id ${child_id} is not found ` });
  } else {
    req.child = foundChild;
    next();
  }
};
// Had to rewrite checkIfChild exist due to bug in initial function, investgate further
const checkChildExist2 = async (req, res, next) => {
  try {
    const child = await Children.findByChildId(req.params.id);
    if (!child) {
      res.status(404).json({
        message: 'no such child',
      });
    } else {
      req.child = child;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: 'Problem finding child',
    });
  }
};

const checkIfCourseExist = async (req, res, next) => {
  try {
    const course_id = req.query.course_id;
    const course = await Course.findByCourseId(course_id);
    if (!course) {
      res.status(404).json({
        message: 'no such course',
      });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: 'Problem finding course',
    });
  }
};

const checkChildAge = async (req, res, next) => {
  try {
    const course_id = req.query.course_id;
    const course = await Course.findByCourseId(course_id);
    const child = await Children.findByChildId(req.params.id);
    if (child.age < course.min_age || child.age > course.max_age) {
      res.status(404).json({
        message: 'Child is not the right age for this course',
      });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: 'Problem checking age',
    });
  }
};

// Function is awaiting data from how many are enrolled
const checkCourseSize = async (req, res, next) => {
  try {
    const course_id = req.query.course_id;
    const course = await Course.findByCourseId(course_id);
    if (course.max_size == course.enrolled) {
      res.status(404).json({
        message: 'Course is at max size! Sorry, try a different course',
      });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: 'Problem checking course size',
    });
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

const isChildParent = async (req, res, next) => {
  const { child_id } = req.params;
  const { profile_id } = req.profile;
  const [parent] = await Children.findChildParent(child_id);
  if (parent.profile_id === profile_id) {
    next();
  } else {
    next({
      status: 403,
      message: `Child with id ${child_id} does not belong to parent with profile id ${profile_id}`,
    });
  }
};

const checkChildObject = async (req, res, next) => {
  let requiredFields = [
    ['name', 'string'],
    ['username', 'string'],
    ['age', 'number'],
  ];

  for (let field of requiredFields) {
    if (!req.body[field[0]])
      res.status(400).json({ message: `${field[0]} is required` });
    if (typeof req.body[field[0]] !== field[1])
      res.status(400).json({ message: `${field[0]} must be a ${field[1]}` });
  }

  if (
    typeof req.body.avatarUrl !== 'string' ||
    req.body.avatarUrl.length > 255
  ) {
    req.body.avatarUrl = undefined;
  }

  next();
};

module.exports = {
  checkChildExist,
  isChildAlreadyEnrolled,
  isChildParent,
  checkChildObject,
  checkChildExist2,
  checkIfCourseExist,
  checkChildAge,
  checkCourseSize,
};
