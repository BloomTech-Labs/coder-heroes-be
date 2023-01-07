const express = require('express');
const Programs = require('./programTypesModel');

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

router.get('/', async function (req, res, next) {
  try {
    const programs = await Programs.getAll();
    res.status(200).json(programs);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * components:
 *  parameters:
 *    program_id:
 *        name: program_id
 *        in: path
 *        description: ID of the program to return
 *        required: true
 *        example: 1
 *        schema:
 *         type: integer
 *
 * /programs/{program_id}:
 *  get:
 *   description: Returns a program object
 *   security:
 *     - okta: []
 *   tags:
 *     - programs
 *   parameters:
 *      - $ref: '#/components/parameters/program_id'
 *   responses:
 *     200:
 *       description: program object
 *       content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Programs'
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/Programs'
 *              example:
 *                  program_id: 1
 *                  program_name: 'Codercamp'
 *                  program_description: 'Students build their own app based on their own interest'
 *     401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *     403:
 *         $ref: '#/components/responses/UnauthorizedError'
 *     404:
 *       description: 'Program with id {program_id} not found.'
 */

router.get('/:id', checkProgramExists, async function (req, res) {
  res.status(200).json(req.programFromDB);
});

/**
 * @swagger
 * /program(s):
 *  post:
 *   description: Returns a newly created program object
 *   security:
 *     - okta: []
 *   tags:
 *     - programs
 *   requestBody:
 *      description: Program object to be created
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Programs'
 *          example:
 *                  program_name: 'Codersitters'
 *                  program_description: 'Coding through play, coding + babysitting (not just code, also creativity)'
 *   responses:
 *     200:
 *       description: program object
 *       content:
 *          application/json:
 *              type: object
 *              example:
 *                  program_id: 2
 *                  program_name: 'Codersitters'
 *                  program_description: 'Coding through play, coding + babysitting (not just code, also creativity)'
 *     401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *     403:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

router.post(
  '/',
  validateProgramObject,
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

/**
 * @swagger
 * components:
 *  parameters:
 *    program_id:
 *        name: program_id
 *        in: path
 *        description: ID of the program to update
 *        required: true
 *        example: 2
 *        schema:
 *         type: integer
 *
 * /programs/{program_id}:
 *  put:
 *   description: Returns an updated program object
 *   security:
 *     - okta: []
 *   tags:
 *     - programs
 *   parameters:
 *      - $ref: '#/components/parameters/program_id'
 *   requestBody:
 *      description: Program object to be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Programs'
 *          example:
 *                  program_name: 'Codersitters'
 *                  program_description: 'Coding through play, coding + babysitting (code and creativity)'
 *   responses:
 *     200:
 *       description: program object
 *       content:
 *          application/json:
 *              type: object
 *              example:
 *                  program_id: 2
 *                  program_name: 'Codersitters'
 *                  program_description: 'Coding through play, coding + babysitting (code and creativity)'
 *     401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *     403:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

router.put(
  '/:id',
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

/**
 * @swagger
 * /programs/{program_id}:
 *  delete:
 *    summary: Remove a program
 *    security:
 *      - okta: []
 *    tags:
 *      - programs
 *    parameters:
 *      - $ref: '#/components/parameters/program_id'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: An object message about the deleted program
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Codersitters has been deleted successfully
 */

router.delete('/:id', checkProgramExists, async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    const deletionMessage = await Programs.remove(id);
    res.status(200).json(deletionMessage);
  } catch (error) {
    next(error);
  }
});

router.use('*', errorhandler);
//eslint-disable-next-line
function errorhandler(err, req, res, next) {
  res.status(err.status || 500).json(err.message);
}

module.exports = router;
