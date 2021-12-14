const db = require('../../data/db-config');

const getAllCourseTypes = async () => {
  return await db('course_types');
};

const findBySubject = async (subject) => {
  return db('course_types').where('subject', 'ilike', subject);
};

const addCourseType = async (course_object) => {
  return db('course_types').insert(course_object).returning('*');
};

const updateCourseType = (subject, course) => {
  return db('course_types')
    .where({ subject })
    .first()
    .update(course)
    .returning('*');
};

const removeCourseType = async (subject) => {
  return await db('courses').where({ subject }).del();
};

module.exports = {
  getAllCourseTypes,
  findBySubject,
  addCourseType,
  updateCourseType,
  removeCourseType,
};
