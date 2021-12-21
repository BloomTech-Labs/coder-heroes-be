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
  return await db('children')
    .join('enrollments', 'children.child_id', 'enrollments.child_id')
    .join('classes', 'enrollments.class_id', 'classes.class_id')
    .where('children.child_id', id);
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
