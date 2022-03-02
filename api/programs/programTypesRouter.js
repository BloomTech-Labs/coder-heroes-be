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

/**
 * @swagger
 * components:
 *  schemas:
 *    Programs:
 *      type: object
 *      required:
 *        - program_id
 *        - program_name
 *        - program_description
 *      example:
 *        program_id: 1
 *        program_name: 'CoderCamp'
 *        program_description: 'Students build their own app based on their own interest'
 * /program(s):
 *  get:
 *   description: Returns a list of all programs
 *   security:
 *     - okta: []
 *   tags:
 *     - programs
 *   responses:
 *     200:
 *       description: array of programs
 *       content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Programs'
 *              example:
 *                - program_id: 1
 *                  program_name: 'Codercamp'
 *                  program_description: 'Students build their own app based on their own interest'
 *                - program_id: 2
 *                  program_name: 'Codersitters'
 *                  program_description: 'Coding through play, coding + babysitting (not just code, also creativity)'
 *                - program_id: 3
 *                  program_name: 'Coderyoga'
 *                  program_description: 'Kids learn coding basics through yoga stories and exercise'
 *     401:
 *       $ref: '#/components/responses/UnauthorizedError'
 *     403:
 *       $ref: '#/components/responses/UnauthorizedError'
 */

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
