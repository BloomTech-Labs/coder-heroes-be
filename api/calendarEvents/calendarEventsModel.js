const db = require('../../data/db-config');

const getAllCalendarEvents = () => {
  return db('calendar_events').select('*');
};

const addCalendarEvent = async (newCalendarEvent) => {
  const [createdCalendarEvent] = await db('calendar_events')
    .insert(newCalendarEvent)
    .returning('*');
  return createdCalendarEvent;
};

const delCalendarEventById = async (event_id) => {
  return await db('calendar_events').where('event_id', event_id).del();
};

module.exports = {
  getAllCalendarEvents,
  addCalendarEvent,
  delCalendarEventById,
};
