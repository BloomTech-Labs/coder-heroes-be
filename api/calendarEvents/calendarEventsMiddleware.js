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

const validateCalendarEvent = (req, res, next) => {
  const { date, time, type, content, details } = req.body;
  if (!date || !time || !type || !content || !details) {
    next(
      createError(
        400,
        'date, time, type, content, and details must be present in request'
      )
    );
  } else {
    req.validatedCalendarEvent = {
      date,
      time,
      type,
      content,
      details,
      profile_id: req.profile.profile_id,
    };
    next();
  }
};

module.exports = {
  checkCalendarEventExists,
  validateCalendarEvent,
};
