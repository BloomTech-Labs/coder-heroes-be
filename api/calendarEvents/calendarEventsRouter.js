const router = require('express').Router();
const authRequired = require('../middleware/authRequired');

const CalendarEvents = require('./calendarEventsModel');

router.get('/', authRequired, (req, res, next) => {
  CalendarEvents.getAllCalendarEvents()
    .then((events) => {
      res.status(200).json(events);
    })
    .catch(() => next);
});

module.exports = router;
