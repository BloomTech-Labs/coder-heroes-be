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

const addCourseType = async (program_object) => {
  return db('programs').insert(program_object).returning('*');
};

const updateCourseType = (id, program_object) => {
  return db('programs')
    .where('program_id', id)
    .update(program_object)
    .returning('*');
};

const removeCourseType = async (id) => {
  const deletedProgram = await getById(id);
  await db('programs').where('program_id', id).del();
  return `${deletedProgram.program_name} program has been delted successfully`;
};

module.exports = {
  getAllProgramTypes,
  getById,
  getByName,
  addCourseType,
  updateCourseType,
  removeCourseType,
};
