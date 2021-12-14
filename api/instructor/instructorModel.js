const db = require('../../data/db-config');

const getInstructors = async () => {
  return await db('instructors').leftJoin(
    'profiles',
    'instructors.profile_id',
    'profiles.profile_id'
  );
};

const findByInstructorId = async (instructor_id) => {
  return db('instructors')
    .leftJoin('profiles', 'instructors.profile_id', 'profiles.profile_id')
    .where('instructors.instructor_id', instructor_id);
};

const findByProfileId = async (profile_id) => {
  return db('instructors')
    .leftJoin('profiles', 'instructors.profile_id', 'profiles.profile_id')
    .where('instructors.profile_id', profile_id);
};

const findInstructorCourses = async (instructor_id) => {
  return db('instructors')
    .leftJoin(
      'classes',
      'instructors.instructor_id',
      '=',
      'classes.instructor_id'
    )
    .where('instructors.instructor_id', instructor_id);
};

const addInstructor = async (instructor) => {
  return await db('instructors').insert(instructor).returning('*');
};

const updateInstructor = async (instructor_id, instructor) => {
  return await db('instructors').where({ instructor_id }).update(instructor);
};

const removeInstructor = async (instructor_id) => {
  return await db('instructors').where({ instructor_id }).del();
};

module.exports = {
  getInstructors,
  findByInstructorId,
  findByProfileId,
  findInstructorCourses,
  addInstructor,
  updateInstructor,
  removeInstructor,
};
