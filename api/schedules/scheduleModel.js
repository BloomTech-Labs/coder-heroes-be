const db = require('../../data/db-config');

const getSchedules = async () => {
  return await db('schedules')
    .leftJoin('courses', 'schedules.course_id', 'courses.id')
    .leftJoin('instructors', 'schedules.instructor_id', 'instructors.id')
    .leftJoin('profiles', 'instructors.user_id', 'profiles.key')
    .rightJoin('sessions', 'schedules.id', 'sessions.schedule_id');
};

const findByScheduleId = async (id) => {
  return db('schedules')
    .leftJoin('courses', 'schedules.course_id', 'courses.id')
    .leftJoin('instructors', 'schedules.instructor_id', 'instructors.id')
    .leftJoin('profiles', 'instructors.user_id', 'profiles.key')
    .rightJoin('sessions', 'schedules.id', 'sessions.schedule_id')
    .where('schedules.id', id);
};

const addSchedule = async (schedule) => {
  return await db('schedules').insert(schedule).returning('*');
};

const addSessions = async (session) => {
  return await db('sessions').insert(session).returning('*');
};

const updateSchedule = async (id, schedule) => {
  return await db('schedules').where({ id }).update(schedule).returning('*');
};

const removeSchedule = async (id) => {
  return await db('schedules').where({ id }).del();
};

module.exports = {
  getSchedules,
  findByScheduleId,
  addSchedule,
  addSessions,
  updateSchedule,
  removeSchedule,
};
