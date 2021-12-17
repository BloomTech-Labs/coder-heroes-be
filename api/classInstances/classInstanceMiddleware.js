const Classes = require('./classInstancesModel');

const checkClassInstanceExist = async (req, res, next) => {
  const class_id = req.params.class_id;
  try {
    const [foundClassInstance] = await Classes.findByClassInstanceId(class_id);
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

module.exports = checkClassInstanceExist;
