const db = require('../../data/db-config');

//justin
const getSchedules = async () => {
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

const findByScheduleId = async (class_id) => {
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

const addClass = async (newClass) => {
  return await db('classes').insert(newClass).returning('*');
};

const updateSchedule = async (class_id, newClass) => {
  return await db('classes')
    .where({ class_id })
    .update(newClass)
    .returning('*');
};

const removeSchedule = async (class_id) => {
  return await db('classes').where({ class_id }).del();
};

module.exports = {
  getSchedules,
  findByScheduleId,
  addClass,
  updateSchedule,
  removeSchedule,
};
