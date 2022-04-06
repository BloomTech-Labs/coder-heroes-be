const db = require('../../data/db-config');

const getAllCalendarEvents = () => {
  return db('calendar_events').select('*');
};

const findCalendarEventById = async (event_id) => {
  const calendarEvent = await db('calendar_events').where({ event_id }).first();
  return calendarEvent;
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

module.exports = {
  getAllCalendarEvents,
  findCalendarEventById,
  addCalendarEvent,
  updateCalendarEvent,
  delCalendarEventById,
};
