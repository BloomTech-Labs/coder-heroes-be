const db = require('../../data/db-config');

const findInstructorCourses = async (profile_id) => {
  return db('instructors')
    .leftJoin(
      'courses',
      'instructors.instructor_id',
      '=',
      'courses.instructor_id'
    )
    .where('instructors.profile_id', profile_id);
};

const findByInstructorId = async (instructor_id) => {
  const instructor = await db('instructors').where({ instructor_id }).first();
  return instructor;
};

const findInstructorIdByProfileId = async (profile_id) => {
  return await db('instructors')
    .select('instructor_id')
    .where('profile_id', profile_id)
    .first();
};

module.exports = {
  findInstructorCourses,
  findByInstructorId,
  findInstructorIdByProfileId,
};
