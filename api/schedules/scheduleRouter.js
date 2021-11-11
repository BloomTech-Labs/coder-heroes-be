const express = require('express');
// const authRequired = require('../middleware/authRequired');
const Schedules = require('./scheduleModel');
const router = express.Router();

router.get('/', function (req, res) {
  Schedules.getSchedules()
    .then((scheduleList) => {
      res.status(200).json(scheduleList);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', function (req, res) {
  const id = String(req.params.id);
  Schedules.findByScheduleId(id)
    .then((schedule) => {
      if (schedule) {
        res.status(200).json(schedule);
      } else {
        res.status(404).json({ error: 'ScheduleNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', async (req, res) => {
  const schedule = req.body;
  if (schedule) {
    try {
      await Schedules.addSchedule(schedule).then((inserted) =>
        res
          .status(200)
          .json({ message: 'Schedule added.', schedule: inserted[0] })
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(404).json({ message: 'Schedule details missing.' });
  }
});

router.put('/', (req, res) => {
  const schedule = req.body;
  if (schedule) {
    const { id } = schedule;
    Schedules.findByScheduleId(id)
      .then(
        Schedules.updateSchedule(id, schedule)
          .then((updated) => {
            res.status(200).json({
              message: `Schedule with id: ${id} updated`,
              schedule: updated[0],
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update schedule '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find schedule '${id}'`,
          error: err.message,
        });
      });
  }
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  try {
    Schedules.findByScheduleId(id).then((schedule) => {
      Schedules.removeSchedule(schedule[0].id).then(() => {
        res.status(200).json({
          message: `Schedule with id:'${id}' was deleted.`,
          schedule: schedule[0],
        });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete schedule with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
