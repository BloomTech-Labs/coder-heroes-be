const db = require('../../data/db-config');

const getAllCalendarEvents = () => {
  return db('calendar_events').select('*');
};

module.exports = {
  getAllCalendarEvents,
};
