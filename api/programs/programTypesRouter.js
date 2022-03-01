const express = require('express');
const Programs = require('./programTypesModel');
const authRequired = require('../middleware/authRequired');
// const {
//   roleAuthentication,
//   roles,
// } = require('../middleware/roleAuthentication'); needs to be refactored
const router = express.Router();
const {
  validateProgramObject,
  checkIfProgramIsUnique,
  checkProgramExists,
} = require('./programTypesMiddleware');

router.get('/', authRequired, async function (req, res, next) {
  try {
    const programs = await Programs.getAll();
    res.status(200).json(programs);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authRequired, checkProgramExists, async function (req, res) {
  res.status(200).json(req.programFromDB);
});

router.post(
  '/',
  validateProgramObject,
  authRequired,
  checkIfProgramIsUnique,
  async (req, res, next) => {
    try {
      const newCourse = await Programs.add(req.body);
      res.status(201).json(newCourse);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  authRequired,
  checkProgramExists,
  validateProgramObject,
  async (req, res, next) => {
    const id = Number(req.params.id);
    try {
      const [updatedCourse] = await Programs.update(id, req.body);
      res.status(200).json(updatedCourse);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  authRequired,
  checkProgramExists,
  async (req, res, next) => {
    const id = Number(req.params.id);
    try {
      const deletionMessage = await Programs.remove(id);
      res.status(200).json(deletionMessage);
    } catch (error) {
      next(error);
    }
  }
);

router.use('*', errorhandler);
//eslint-disable-next-line
function errorhandler(err, req, res, next) {
  res.status(err.status || 500).json(err.message);
}

module.exports = router;
