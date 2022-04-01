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

module.exports = {
  getAllCalendarEvents,
  addCalendarEvent,
};
