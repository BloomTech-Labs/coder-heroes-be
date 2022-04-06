const CalendarEvents = require('./calendarEventsModel');
const createError = require('http-errors');

const checkCalendarEventExists = async (req, res, next) => {
  const event_id = parseInt(req.params.event_id);
  try {
    const foundEvent = await CalendarEvents.findCalendarEventById(event_id);
    if (!foundEvent) {
      next(createError(404, `Calendar Event with id ${event_id} is not found`));
    } else {
      req.calendarEvent = foundEvent;
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCalendarEventExists,
};
