const router = require('express').Router();
const authRequired = require('../middleware/authRequired');
const {
  checkCalendarEventExists,
  validateCalendarEvent,
} = require('./calendarEventsMiddleware');

const CalendarEvents = require('./calendarEventsModel');

router.get('/', authRequired, (req, res, next) => {
  CalendarEvents.getAllCalendarEvents()
    .then((events) => {
      res.status(200).json(events);
    })
    .catch(next);
});

router.get('/user', authRequired, (req, res, next) => {
  CalendarEvents.getCalendarEventsByProfileId(req.profile.profile_id)
    .then((events) => {
      res.status(200).json({
        message: `User with profile ID of ${req.profile.profile_id}`,
        events,
      });
    })
    .catch(next);
});

router.get('/:event_id', authRequired, checkCalendarEventExists, (req, res) => {
  res.status(200).json(req.calendarEvent);
});

router.post('/', authRequired, validateCalendarEvent, (req, res, next) => {
  CalendarEvents.addCalendarEvent(req.validatedCalendarEvent)
    .then((newEvent) => {
      res.status(201).json({
        message: 'new event created',
        newEvent,
      });
    })
    .catch(next);
});

router.put(
  '/:event_id',
  authRequired,
  checkCalendarEventExists,
  validateCalendarEvent,
  (req, res, next) => {
    CalendarEvents.updateCalendarEvent(
      req.params.event_id,
      req.validatedCalendarEvent
    )
      .then((updated) => {
        res.status(200).json({
          message: `Calendar event with event_id: ${req.params.event_id} updated`,
          updated,
        });
      })
      .catch(next);
  }
);

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
