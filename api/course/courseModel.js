const db = require('../../data/db-config');

const getCourses = async () => {
  return await db('courses');
};

const findByName = async (subject) => {
  return db('courses').where('subject', 'ilike', subject);
};

const addCourse = async (course) => {
  return db('courses').insert(course).returning('*');
};

const updateCourse = (subject, course) => {
  return db('courses').where({ subject }).first().update(course).returning('*');
};

const removeCourse = async (subject) => {
  return await db('courses').where({ subject }).del();
};

module.exports = {
  getCourses,
  findByName,
  addCourse,
  updateCourse,
  removeCourse,
};
