const db = require('../../data/db-config');

const getAllCourses = async () => {
  return await db('courses as c')
    .select('c.*', 'p.program_name', 'i.instructor_id')
    .leftJoin('programs as p', 'p.program_id', 'c.program_id')
    .leftJoin('instructors as i', 'c.instructor_id', 'i.instructor_id');
};

const findByCourseId = async (course_id) => {
  return await db('courses as c')
    .select('c.*', 'p.program_name', 'i.instructor_id')
    .leftJoin('programs as p', 'p.program_id', 'c.program_id')
    .leftJoin('instructors as i', 'c.instructor_id', 'i.instructor_id')
    .where('c.course_id', course_id)
    .first();
};

const findByInstructorId = async (instructor_id) => {
  return await db('courses as c')
    .select('c.*', 'p.program_name', 'i.instructor_id')
    .leftJoin('programs as p', 'p.program_id', 'c.program_id')
    .leftJoin('instructors as i', 'c.instructor_id', 'i.instructor_id')
    .where('c.instructor_id', instructor_id);
};

const findInstructorIdByEmail = async (instructor_email) => {
  return await db('instructors as i')
    .select('i.instructor_id')
    .leftJoin('profiles as p', 'i.profile_id', 'p.profile_id')
    .where('p.email', instructor_email)
    .first();
};

const addCourse = async (newCourse) => {
  const [createdCourse] = await db('courses').insert(newCourse).returning('*');
  return createdCourse;
};

const updateCourse = async (course_id, newCourse) => {
  return await db('courses')
    .where({ course_id })
    .update(newCourse)
    .returning('*');
};

const removeCourse = async (course_id) => {
  return await db('courses').where('course_id', '=', course_id).del();
};

module.exports = {
  getAllCourses,
  findByCourseId,
  findByInstructorId,
  findInstructorIdByEmail,
  addCourse,
  updateCourse,
  removeCourse,
};
