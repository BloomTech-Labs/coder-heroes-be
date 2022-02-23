const db = require('../../data/db-config');

const getAllClassInstances = async () => {
  return await db('classes as c')
    .select('c.*', 'p.program_name', 'i.instructor_id')
    .leftJoin('programs as p', 'p.program_id', 'c.program_id')
    .leftJoin('instructors as i', 'c.instructor_id', 'i.instructor_id');
};

getAllClassInstances().then((res) => {
  console.log(res);
});

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
  return await db('classes').where('class_id', '=', class_id).del();
};

module.exports = {
  getAllClassInstances,
  findByClassInstanceId,
  addClassInstance,
  updateClassInstance,
  removeClassInstance,
};
