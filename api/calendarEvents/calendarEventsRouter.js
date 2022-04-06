const router = require('express').Router();
const authRequired = require('../middleware/authRequired');
const { checkCalendarEventExists } = require('./calendarEventsMiddleware');

const CalendarEvents = require('./calendarEventsModel');

router.get('/', authRequired, (req, res, next) => {
  CalendarEvents.getAllCalendarEvents()
    .then((events) => {
      res.status(200).json(events);
    })
    .catch(next);
});

router.get(
  '/:event_id',
  authRequired,
  checkCalendarEventExists,
  (req, res, next) => {
    CalendarEvents.findCalendarEventById(req.params.event_id)
      .then((event) => {
        res.status(200).json(event);
      })
      .catch(next);
  }
);
// need POST, PUT, and DELETE endpoints

router.delete(
  '/:event_id',
  authRequired,
  checkCalendarEventExists,
  (req, res, next) => {
    CalendarEvents.delCalendarEventById(req.params.event_id)
      .then(
        res.json({
          message: 'Calendar Event sucessfully deleted',
        })
      )
      .catch(next);
  }
);

module.exports = router;
