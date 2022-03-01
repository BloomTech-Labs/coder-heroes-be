const db = require('../../data/db-config');

const getAllProgramTypes = async () => {
  return db('programs');
};

const getById = async (id) => {
  return db('programs').where('program_id', id).first();
};

const getByName = async (program_name) => {
  return db('programs').where({ program_name }).first();
};

getByName('Coderyoga').then((res) => {
  console.log(res);
});

const addCourseType = async (program_object) => {
  return db('programs').insert(program_object).returning('*');
};

const updateCourseType = (subject, course) => {
  return db('course_types').where('subject', subject).update(course);
};

const removeCourseType = async (subject) => {
  const deletedCourse = await getById(subject);
  await db('course_types').where({ subject }).del();
  return deletedCourse;
};

module.exports = {
  getAllProgramTypes,
  getById,
  getByName,
  addCourseType,
  updateCourseType,
  removeCourseType,
};
