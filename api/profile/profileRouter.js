const express = require('express');
const authRequired = require('../middleware/authRequired');
const ownerAuthorization = require('../middleware/ownerAuthorization');
const Profiles = require('./profileModel');
const { sendEmail, addToList } = require('../email/emailHelper');
const router = express.Router();
const {
  checkProfileObject,
  checkRoleExist,
  checkProfileExists,
  checkProfileExist,
} = require('./profileMiddleware');

router.get('/role/:role_id', authRequired, checkRoleExist, function (req, res) {
  const role_id = req.params.role_id;
  Profiles.findByRoleId(role_id)
    .then((roleList) => {
      res.status(200).json(roleList);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get(
  '/users/:profile_id',
  authRequired,
  checkProfileExist,
  async function (req, res, next) {
    const profile_id = req.params.profile_id;
    const foundProfile = await Profiles.findByProfileId(profile_id);
    if (!foundProfile) {
      next({
        status: 404,
        message: `Profile with profile_id ${profile_id} is not found.`,
      });
    } else {
      res.status(200).json(foundProfile);
    }
  }
);

/**
 * @swagger
 * components:
 *  schemas:
 *    Profile:
 *      type: object
 *      required:
 *        - id
 *        - email
 *        - name
 *        - avatarUrl
 *      properties:
 *        id:
 *          type: string
 *          description: This is a foreign key (the okta user ID)
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        avatarUrl:
 *          type: string
 *          description: public url of profile avatar
 *      example:
 *        id: '00uhjfrwdWAQvD8JV4x6'
 *        email: 'frank@example.com'
 *        name: 'Frank Martinez'
 *        avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *
 * /profiles:
 *  get:
 *    description: Returns a list of profiles
 *    summary: Get a list of all profiles
 *    security:
 *      - okta: []
 *    tags:
 *      - profile
 *    responses:
 *      200:
 *        description: array of profiles
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Profile'
 *              example:
 *                - id: '00uhjfrwdWAQvD8JV4x6'
 *                  email: 'frank@example.com'
 *                  name: 'Frank Martinez'
 *                  avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *                - id: '013e4ab94d96542e791f'
 *                  email: 'cathy@example.com'
 *                  name: 'Cathy Warmund'
 *                  avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/geneseleznev/128.jpg'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', authRequired, function (req, res) {
  Profiles.findAll()
    .then((profiles) => {
      res.status(200).json(profiles);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

/**
 * @swagger
 * components:
 *  parameters:
 *    profileId:
 *      name: id
 *      in: path
 *      description: ID of the profile to return
 *      required: true
 *      example: 00uhjfrwdWAQvD8JV4x6
 *      schema:
 *        type: string
 *
 * /profile/{id}:
 *  get:
 *    description: Find profiles by ID
 *    summary: Returns a single profile
 *    security:
 *      - okta: []
 *    tags:
 *      - profile
 *    parameters:
 *      - $ref: '#/components/parameters/profileId'
 *    responses:
 *      200:
 *        description: A profile object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Profile'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Profile not found'
 */

router.get(
  '/:okta_id',
  authRequired,
  checkProfileExists(true),
  function (req, res) {
    res.status(200).json(req.user);
  }
);

/*p*
 * @swagger
 * /profile:
 *  post:
 *    summary: Add a profile, send a welcome email, add to contact list (all by default, then specified per role)
 *    security:
 *      - okta: []
 *    tags:
 *      - profile
 *    requestBody:
 *      description: Profile object to to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Profile'
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Profile not found'
 *      200:
 *        description: A profile object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: profile created
 *                profile:
 *                  $ref: '#/components/schemas/Profile'
 */
router.post('/', checkProfileObject, async (req, res) => {
  const profile = req.body;
  const profileExists = await Profiles.findById(profile.okta_id);
  if (profileExists) {
    res.status(400).json({ message: 'profile already exists' });
  } else {
    const newProfile = await Profiles.create(profile);
    if (!newProfile) {
      res.status(404).json({
        message: 'There was an error saving the profile to the database.',
      });
    }
    if (newProfile[0].role_id === 3 || newProfile[0].role_id === '3') {
      const instructorWelcomeMessage = {
        dynamic_template_data: {
          name: newProfile[0].name,
        },
        to: newProfile[0].email,
        from: 'someone@somewhere.com', // verified sender in SendGrid account. Try to put this in env - hardcoded here because it wasn't working there.
        template_id: 'd-a4de80911362438bb35d481efa068398',
      };
      const instructorList = {
        list_ids: ['e7b598d9-23ca-48df-a62b-53470b5d1d86'],
        email: newProfile[0].email,
        name: newProfile[0].name,
      };
      sendEmail(instructorWelcomeMessage);
      addToList(instructorList);
      res.status(200).json({
        message: 'instructor profile created',
        profile: newProfile[0],
      });
    } else if (newProfile[0].role_id === 4 || newProfile[0].role_id === '4') {
      const parentWelcomeMessage = {
        dynamic_template_data: {
          name: newProfile[0].name,
        },
        to: newProfile[0].email,
        from: 'someone@somewhere.com',
        template_id: 'd-19b895416ae74cea97e285c4401fcc1f',
      };
      const parentList = {
        list: 'e7b598d9-23ca-48df-a62b-53470b5d1d86',
        email: newProfile[0].email,
        name: newProfile[0].name,
      };
      sendEmail(parentWelcomeMessage);
      addToList(parentList);
      res.status(200).json({
        message: 'parent profile created',
        profile: newProfile[0],
      });
    } else if (newProfile[0].role_id === 5 || newProfile[0].role_id === '5') {
      const studentWelcomeMessage = {
        dynamic_template_data: {
          name: newProfile[0].name,
        },
        to: newProfile[0].email,
        from: 'someone@somewhere.com',
        template_id: 'd-a6dacc6241f9484a96554a13bbdcd971',
      };
      const studentList = {
        list: '4dd72555-266f-4f8e-b595-ecc1f7ff8f28',
        email: newProfile[0].email,
        name: newProfile[0].name,
      };
      sendEmail(studentWelcomeMessage);
      addToList(studentList);
      res.status(200).json({
        message: 'parent profile created',
        profile: newProfile[0],
      });
    } else {
      res.status(200).json({
        message: 'profile created',
        profile: newProfile[0],
      });
    }
  }
});

/**
 * @swagger
 * /profile:
 *  put:
 *    summary: Update a profile
 *    security:
 *      - okta: []
 *    tags:
 *      - profile
 *    requestBody:
 *      description: Profile object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Profile'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A profile object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: profile created
 *                profile:
 *                  $ref: '#/components/schemas/Profile'
 */
router.put(
  '/',
  authRequired,
  checkProfileObject,
  checkProfileExists(false),
  ownerAuthorization('user'),
  (req, res) => {
    const profile = req.body;
    const okta = req.user.okta_id;
    Profiles.update(okta, profile)
      .then((updated) => {
        res
          .status(200)
          .json({ message: 'profile updated', profile: updated[0] });
      })
      .catch((err) => {
        res.status(500).json({
          message: `Could not update profile '${okta}'`,
          error: err.message,
        });
      });
  }
);
/**
 * @swagger
 * /profile/{id}:
 *  delete:
 *    summary: Remove a profile
 *    security:
 *      - okta: []
 *    tags:
 *      - profile
 *    parameters:
 *      - $ref: '#/components/parameters/profileId'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A profile object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Profile '00uhjfrwdWAQvD8JV4x6' was deleted.
 *                profile:
 *                  $ref: '#/components/schemas/Profile'
 */
router.delete(
  '/:okta_id',
  authRequired,
  checkProfileExists(true),
  ownerAuthorization('user'),
  (req, res) => {
    const okta = req.params.okta_id;
    try {
      Profiles.remove(okta).then(() => {
        res.status(200).json({
          message: `Profile '${okta}' was deleted.`,
          profile: req.user,
        });
      });
    } catch (err) {
      res.status(500).json({
        message: `Could not delete profile with ID: ${okta}`,
        error: err.message,
      });
    }
  }
);

module.exports = router;
