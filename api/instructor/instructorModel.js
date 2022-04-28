const db = require('../../data/db-config');

const findInstructorCourses = async (instructor_id) => {
  return db('courses as c')
    .leftJoin('instructors as i', 'i.instructor_id', 'c.course_id')
    .leftJoin('programs as p', 'p.program_id', 'c.program_id')
    .where('c.instructor_id', instructor_id)
    .select('c.*', 'p.program_id', 'p.program_name');
};

const findByInstructorId = async (instructor_id) => {
  const instructor = await db('instructors').where({ instructor_id }).first();
  return instructor;
};

const findInstructorIdByProfileId = (profile_id) => {
  return db('instructors').where({ profile_id }).first();
};

module.exports = {
  findInstructorCourses,
  findByInstructorId,
  findInstructorIdByProfileId,
};
