const db = require('../../data/db-config');

const findInstructorCourses = async (instructor_id) => {
  return db('courses as c')
    .leftJoin('instructors as i', 'i.instructor_id', 'c.course_id')
    .where('c.instructor_id', instructor_id);
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
