const Children = require('./childrenModel');

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
    next({ status: 403, message: 'This is not your child please stay away!' });
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
};
