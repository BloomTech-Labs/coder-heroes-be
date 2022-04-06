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

router.post('/', authRequired, (req, res, next) => {
  const { date, time, type, content, details } = req.body;
  CalendarEvents.addCalendarEvent({
    date,
    time,
    type,
    content,
    details,
    profile_id: req.profile.profile_id,
  })
    .then((newEvent) => {
      res.status(201).json({
        message: 'new event created',
        newEvent,
      });
    })
    .catch(next);
});

router.put('/:event_id', authRequired, (req, res, next) => {
  console.log(req.profile.profile_id);
  const updatedCalendarEvent = {
    date: req.body.date,
    time: req.body.time,
    type: req.body.type,
    content: req.body.content,
    details: req.body.details,
    profile_id: req.profile.profile_id,
  };

  CalendarEvents.updateCalendarEvent(req.params.event_id, updatedCalendarEvent)
    .then((updated) => {
      res.status(200).json({
        message: `Calendar event with event_id: ${req.params.event_id} updated`,
        updated,
      });
    })
    .catch(next);
});

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
