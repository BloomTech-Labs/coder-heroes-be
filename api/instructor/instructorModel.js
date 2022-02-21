const db = require('../../data/db-config');

const findInstructorCourses = async (profile_id) => {
  return db('instructors')
    .leftJoin(
      'classes',
      'instructors.instructor_id',
      '=',
      'classes.instructor_id'
    )
    .where('instructors.profile_id', profile_id);
};

const findByInstructorId = async (instructor_id) => {
  const instructor = await db('instructors').where({ instructor_id }).first();
  return instructor;
};

module.exports = {
  findInstructorCourses,
  findByInstructorId,
};
