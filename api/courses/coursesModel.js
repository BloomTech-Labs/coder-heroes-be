const db = require('../../data/db-config');

const getAllCourseInstances = async () => {
  return await db('courses as c')
    .select('c.*', 'p.program_name', 'i.instructor_id')
    .leftJoin('programs as p', 'p.program_id', 'c.program_id')
    .leftJoin('instructors as i', 'c.instructor_id', 'i.instructor_id');
};

const findByCourseInstanceId = async (course_id) => {
  return await db('courses as c')
    .select('c.*', 'p.program_name', 'i.instructor_id')
    .leftJoin('programs as p', 'p.program_id', 'c.program_id')
    .leftJoin('instructors as i', 'c.instructor_id', 'i.instructor_id')
    .where('c.course_id', course_id)
    .first();
};

const addCourseInstance = async (newCourse) => {
  const [createdCourse] = await db('courses').insert(newCourse).returning('*');
  return createdCourse;
};

const updateCourseInstance = async (course_id, newCourse) => {
  return await db('courses')
    .where({ course_id })
    .update(newCourse)
    .returning('*');
};

const removeCourseInstance = async (course_id) => {
  return await db('courses').where('course_id', '=', course_id).del();
};

module.exports = {
  getAllCourseInstances,
  findByCourseInstanceId,
  addCourseInstance,
  updateCourseInstance,
  removeCourseInstance,
};
