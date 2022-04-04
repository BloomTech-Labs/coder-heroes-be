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

const findInstructorIdByProfileId = (profile_id) => {
  return db('instructors')
    .where({ profile_id })
    .first()
    .select('instructors.instructor_id');
};

module.exports = {
  findInstructorCourses,
  findByInstructorId,
  findInstructorIdByProfileId,
};
