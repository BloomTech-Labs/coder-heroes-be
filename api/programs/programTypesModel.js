const db = require('../../data/db-config');

const getAll = async () => {
  return db('programs');
};

const getById = async (id) => {
  return db('programs').where('program_id', id).first();
};

const getByName = async (program_name) => {
  return db('programs').where({ program_name }).first();
};

const add = async (program_object) => {
  return db('programs').insert(program_object).returning('*');
};

const update = (id, program_object) => {
  return db('programs')
    .where('program_id', id)
    .update(program_object)
    .returning('*');
};

const remove = async (id) => {
  const deletedProgram = await getById(id);
  await db('programs').where('program_id', id).del();
  return `${deletedProgram.program_name} program has been deleted successfully`;
};

module.exports = {
  getAll,
  getById,
  getByName,
  add,
  update,
  remove,
};
