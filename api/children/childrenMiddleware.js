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
  const { class_id } = req.body;
  const enrolledClasses = await Children.getEnrolledCourses(id);
  const chidIsenrolled = enrolledClasses.find((item) => {
    if (class_id == item.class_id) {
      return true;
    }
  });
  if (chidIsenrolled) {
    next({ status: 404, message: 'child is already enrolled' });
  } else {
    req.wantToEnroll = { child_id: id, ...req.body, class_id: class_id };

    console.log(req.wantToEnroll);
    next();
  }
};

module.exports = {
  checkChildExist,
  isChildAlreadyEnrolled,
};
