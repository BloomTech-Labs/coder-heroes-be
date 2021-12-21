const db = require('../../data/db-config');

const getAllCourseTypes = async () => {
  return await db('course_types');
};

const findBySubject = async (subject) => {
  return db('course_types').where('subject', subject).first();
};

const addCourseType = async (course_object) => {
  await db('course_types').insert(course_object);
  return await findBySubject(course_object.subject);
};

const updateCourseType = (subject, course) => {
  return db('course_types').where('subject', subject).update(course);
};

const removeCourseType = async (subject) => {
  const deletedCourse = await findBySubject(subject);
  await db('course_types').where({ subject }).del();
  return deletedCourse;
};

module.exports = {
  getAllCourseTypes,
  findBySubject,
  addCourseType,
  updateCourseType,
  removeCourseType,
};
