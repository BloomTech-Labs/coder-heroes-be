const router = require('express').Router();
const authRequired = require('../middleware/authRequired');

const CalendarEvents = require('./calendarEventsModel');

router.get('/', authRequired, (req, res, next) => {
  CalendarEvents.getAllCalendarEvents()
    .then((events) => {
      res.status(200).json(events);
    })
    .catch(next);
});

// need POST, PUT, and DELETE endpoints

router.delete('/:id', authRequired, (req, res, next) => {
  CalendarEvents.delCalendarEventById(req.params.id)
    .then(
      res.json({
        message: 'Calendar Event sucessfully deleted',
      })
    )
    .catch(next);
});

module.exports = router;
