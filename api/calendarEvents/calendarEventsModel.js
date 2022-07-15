const db = require('../../data/db-config');

const getAllCalendarEvents = () => {
  return db('calendar_events').select('*');
};

const findCalendarEventById = async (event_id) => {
  const calendarEvent = await db('calendar_events').where({ event_id }).first();
  return calendarEvent;
};

const getCalendarEventsByProfileId = async (profile_id) => {
  const calendarEvents = await db('calendar_events')
    .where({ profile_id })
    .select('*');
  return calendarEvents;
};

const addCalendarEvent = async (newCalendarEvent) => {
  const [createdCalendarEvent] = await db('calendar_events')
    .insert(newCalendarEvent)
    .returning('*');
  return createdCalendarEvent;
};

const updateCalendarEvent = async (event_id, updatedCalendarEvent) => {
  return await db('calendar_events')
    .where('event_id', event_id)
    .update(updatedCalendarEvent)
    .returning('*');
};

const delCalendarEventById = async (event_id) => {
  return await db('calendar_events').where('event_id', event_id).del();
};

const addCourse = async (newCourse) => {
  const [createdCourse] = await db('courses').insert(newCourse).returning('*');
  return createdCourse;
};

const updateCourse = async (course_id, updatedCourse) => {
  return await db('courses')
    .where({ course_id })
    .update(updatedCourse)
    .returning('*');
};

const removeCourse = async (course_id) => {
  return await db('courses').where('course_id', '=', course_id).del();
};

module.exports = {
  getAllCalendarEvents,
  findCalendarEventById,
  getCalendarEventsByProfileId,
  addCalendarEvent,
  updateCalendarEvent,
  delCalendarEventById,
  addCourse,
  updateCourse,
  removeCourse,
};
