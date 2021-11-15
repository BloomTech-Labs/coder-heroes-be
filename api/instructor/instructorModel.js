const db = require('../../data/db-config');

const getInstructors = async () => {
  return await db('instructors').leftJoin(
    'profiles',
    'instructors.user_id',
    'profiles.okta'
  );
};

const findByInstructorId = async (id) => {
  return db('instructors')
    .leftJoin('profiles', 'instructors.user_id', 'profiles.okta')
    .where('instructors.id', id);
};

const findByOkta = async (okta) => {
  return db('instructors')
    .leftJoin('profiles', 'instructors.user_id', 'profiles.okta')
    .where('instructors.user_id', okta);
};

const findInstructorCourses = async (id) => {
  return db('instructors')
    .leftJoin('instructor_list', 'instructors.id', 'instructor_list.id')
    .leftJoin('courses', 'instructor_list.course_id', 'courses.id')
    .where('instructors.id', id);
};

const addInstructor = async (instructor) => {
  return await db('instructors').insert(instructor).returning('*');
};

const updateInstructor = async (id, instructor) => {
  return await db('instructors').where({ id }).update(instructor);
};

const removeInstructor = async (id) => {
  return await db('instructors').where({ id }).del();
};

module.exports = {
  getInstructors,
  findByInstructorId,
  findByOkta,
  findInstructorCourses,
  addInstructor,
  updateInstructor,
  removeInstructor,
};
