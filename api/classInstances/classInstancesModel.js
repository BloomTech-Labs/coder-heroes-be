const db = require('../../data/db-config');

//justin
const getAllClassInstances = async () => {
  return await db('classes')
    .leftJoin(
      'course_types',
      'classes.course_type_id',
      'course_types.course_type_id'
    )
    .leftJoin(
      'instructors',
      'classes.instructor_id',
      'instructors.instructor_id'
    )
    .leftJoin('profiles', 'instructors.profile_id', 'profiles.profile_id');
};

const findByClassInstanceId = async (class_id) => {
  return db('classes')
    .leftJoin(
      'course_types',
      'classes.course_type_id',
      'course_types.course_type_id'
    )
    .leftJoin(
      'instructors',
      'classes.instructor_id',
      'instructors.instructor_id'
    )
    .leftJoin('profiles', 'instructors.profile_id', 'profiles.profile_id')
    .where('classes.class_id', class_id);
};

const addClassInstance = async (newClass) => {
  return await db('classes').insert(newClass).returning('*');
};

const updateClassInstance = async (class_id, newClass) => {
  return await db('classes')
    .where({ class_id })
    .update(newClass)
    .returning('*');
};

const removeClassInstance = async (class_id) => {
  return await db('classes').where({ class_id }).del();
};

module.exports = {
  getAllClassInstances,
  findByClassInstanceId,
  addClassInstance,
  updateClassInstance,
  removeClassInstance,
};
