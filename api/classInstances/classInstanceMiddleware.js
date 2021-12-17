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

const checkClassInstanceObject = async (req, res, next) => {
  const {
    size,
    open_seats_remaining,
    instructor_id,
    course_type_id,
    start_time,
    end_time,
    start_date,
    end_date,
    location,
  } = req.body;
  if (
    !size ||
    !open_seats_remaining ||
    !instructor_id ||
    !course_type_id ||
    !start_time ||
    !end_time ||
    !start_date ||
    !end_date ||
    !location
  ) {
    next({
      status: 404,
      message: `Please be sure that all information is submitted in order to add a new class instance to the database. Remember, we need size, open seats remaining, instructor id, course type id, start and end time, start and end date, and the location.`,
    });
  } else {
    next();
  }
};

module.exports = { checkClassInstanceExist, checkClassInstanceObject };
