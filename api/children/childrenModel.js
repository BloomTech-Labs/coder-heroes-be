const db = require('../../data/db-config');

const getChildren = async () => {
  return await db('children');
};

const findByChildId = async (child_id) => {
  return db('children')
    .join('profiles', 'children.profile_id', 'profiles.profile_id')
    .where('child_id', child_id)
    .first();
};

const addChild = async (child) => {
  return await db('children').insert(child).returning('*');
};

const getEnrolledCourses = async (child_id) => {
  // receives error if the id of the course doesn't exist exist  this have to modified later on we need to make a middleware that checks fot the existing courses then runs this model'
  const enrollments = await db('children')
    .join('enrollments', 'children.child_id', 'enrollments.child_id')
    .join('courses', 'enrollments.course_id', 'courses.course_id')
    .join('profiles', 'profiles.profiles_id', 'instructors.profile_id')
    .where('children.child_id', child_id)
    .select('enrollments.*, courses.*', 'profiles.name as instructor_name');
  const child = await findByChildId(child_id);

  return {
    ...child,
    enrollments,
  };
};

const addEnrolledCourse = async (course) => {
  // need to added middleware to the router that checks if the course exists because if it doesn't we get no response back from sever
  await db('enrollments').insert(course);
  return await getEnrolledCourses(course.child_id);
};

module.exports = {
  getEnrolledCourses,
  addEnrolledCourse,
  findByChildId,
  addChild,
  getChildren,
};
