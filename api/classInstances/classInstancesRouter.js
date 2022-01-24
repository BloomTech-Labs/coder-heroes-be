const express = require('express');
const authRequired = require('../middleware/authRequired');
const {
  roleAuthentication,
  roles,
} = require('../middleware/roleAuthentication');
const Classes = require('./classInstancesModel');
const router = express.Router();
const {
  checkClassInstanceExist,
  checkClassInstanceObject,
} = require('./classInstanceMiddleware');
//justin push push

router.get('/', authRequired, function (req, res) {
  Classes.getAllClassInstances()
    .then((scheduleList) => {
      res.status(200).json(scheduleList);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:class_id', authRequired, checkClassInstanceExist, function (
  req,
  res
) {
  const class_id = String(req.params.class_id);
  Classes.findByClassInstanceId(class_id)
    .then((class_instance) => {
      res.status(200).json(class_instance);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post(
  '/',
  checkClassInstanceObject,
  roleAuthentication(...roles.slice(2)),
  async (req, res) => {
    const classInstance = req.body;
    try {
      await Classes.addClassInstance(classInstance).then((inserted) => {
        res.status(200).json({
          message: 'New Class Instance Added.',
          schedule: inserted[0],
        });
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  }
);

router.put(
  '/:class_id',
  authRequired,
  checkClassInstanceExist,
  (req, res, next) => {
    const class_id = req.params.class_id;
    const newClassObject = req.body;

    Classes.updateClassInstance(class_id, newClassObject)
      .then((updated) => {
        res.status(200).json({
          message: `Class instance with the class_id: ${class_id} updated`,
          class_instance: updated[0],
        });
      })
      .catch((err) => {
        next(err);
      });
  }
);

router.delete(
  '/:class_id',
  authRequired,
  checkClassInstanceExist,
  (req, res, next) => {
    const class_id = req.params.class_id;
    try {
      Classes.removeClassInstance(class_id).then(() => {
        res.status(200).json({
          message: `Schedule with id:'${class_id}' was deleted.`,
        });
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
