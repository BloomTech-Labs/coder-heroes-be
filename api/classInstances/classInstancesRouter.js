const express = require('express');
const authRequired = require('../middleware/authRequired');
const Schedules = require('./classInstancesModel');
const router = express.Router();
const checkClassInstanceExist = require('./classInstanceMiddleware');
//justin push push

router.get('/', authRequired, function (req, res) {
  Schedules.getAllClassInstances()
    .then((scheduleList) => {
      res.status(200).json(scheduleList);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:class_id', checkClassInstanceExist, authRequired, function (
  req,
  res
) {
  const class_id = String(req.params.class_id);
  Schedules.findByClassInstanceId(class_id)
    .then((class_instance) => {
      res.status(200).json(class_instance);
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

router.post('/sessions', async (req, res) => {
  const sessions = req.body;
  console.log(sessions);
  if (sessions) {
    try {
      await Schedules.addSessions(sessions).then((inserted) => {
        res
          .status(200)
          .json({ message: 'A new session was added', sessions: inserted[0] });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(404).json({ message: 'Sessions details missing' });
  }
});

router.put('/', authRequired, (req, res) => {
  const schedule = req.body;
  if (schedule) {
    const { id } = schedule;
    Schedules.findByClassInstanceId(id)
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
    Schedules.findByClassInstanceId(id).then((schedule) => {
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
