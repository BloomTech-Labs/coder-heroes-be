const db = require('../../data/db-config');

const getChildren = async () => {
  return await db('children');
};

const findByChildId = async (id) => {
  return db('children')
    .join('profiles', 'children.profile_id', 'profiles.profile_id')
    .where('child_id', id)
    .first();
};

const getEnrolledCourses = async (id) => {
  // recives error if the id of the class doesn't exist exist  this have to modified lateron we need to make a midleware that checks fot the existing classes then runs this model'
  const enrollments = await db('children')
    .join('enrollments', 'children.child_id', 'enrollments.child_id')
    .join('classes', 'enrollments.class_id', 'classes.class_id')
    .where('children.child_id', id);

  const enrolledCourses = {
    child_id: id,
    proflie_id: enrollments[0].profile_id,
    username: enrollments[0].username,
    age: enrollments[0].age,
    parent_id: enrollments[0].parent_id,
    enrolled_courses: enrollments.map((x) => {
      const container = {};
      container.class_id = x.class_id;
      container.completed = x.completed;
      container.class_size = x.size;
      container.open_seats_remaining = x.open_seats_remaining;
      container.instructor_id = x.instructor_id;
      container.course_type_id = x.course_type_id;
      container.start_time = x.start_time;
      container.end_time = x.end_time;
      container.start_date = x.start_date;
      container.end_date = x.end_date;
      container.location = x.location;
      return container;
    }),
  };
  return enrolledCourses;
};

const addEnrolledCourse = async (course) => {
  // need to added middleware to the router that checks if the class exists because if it doesnt we get no response back from sever
  await db('enrollments').insert(course);
  return await getEnrolledCourses(course.child_id);
};

module.exports = {
  getChildren,
  getEnrolledCourses,
  addEnrolledCourse,
  findByChildId,
};
