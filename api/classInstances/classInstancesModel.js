const db = require('../../data/db-config');

const getAllClassInstances = async () => {
  return await db('classes as c')
    .select('c.*', 'p.program_name', 'i.instructor_id')
    .leftJoin('programs as p', 'p.program_id', 'c.program_id')
    .leftJoin('instructors as i', 'c.instructor_id', 'i.instructor_id');
};

const findByClassInstanceId = async (class_id) => {
  return await db('classes as c')
    .select('c.*', 'p.program_name', 'i.instructor_id')
    .leftJoin('programs as p', 'p.program_id', 'c.program_id')
    .leftJoin('instructors as i', 'c.instructor_id', 'i.instructor_id')
    .where('c.class_id', class_id)
    .first();
};

//FUNCTIONS BELOW NEED TO BE UPDATED BASED ON CHANGES TO CLASSES TABLE

const addClassInstance = async (newClass) => {
  const [createdClass] = await db('classes').insert(newClass).returning('*');
  return createdClass;
};

const updateClassInstance = async (class_id, newClass) => {
  return await db('classes')
    .where({ class_id })
    .update(newClass)
    .returning('*');
};

const removeClassInstance = async (class_id) => {
  return await db('classes').where('class_id', '=', class_id).del();
};

module.exports = {
  getAllClassInstances,
  findByClassInstanceId,
  addClassInstance,
  updateClassInstance,
  removeClassInstance,
};
