const express = require('express');
const authRequired = require('../middleware/authRequired');
const ownerAuthorization = require('../middleware/ownerAuthorization');
const Profiles = require('./profileModel');
const router = express.Router();
const {
  checkProfileObject,
  checkRoleExist,
  checkProfileExist,
} = require('./profileMiddleware');

router.get(
  '/:role/:role_id',
  authRequired,
  checkRoleExist,
  function (req, res) {
    const role_id = req.params.role_id;
    Profiles.findByRoleId(role_id)
      .then((roleList) => {
        res.status(200).json(roleList);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
  }
);

router.get(
  '/users/:profile_id',
  authRequired,
  checkProfileExist,
  async function (req, res, next) {
    const profile_id = req.params.profile_id;
    const foundProfile = await Profiles.findById(profile_id);
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

//TO-DO: Implement Auth0 - secure endpoint
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

// TO-DO: Implement Auth0 - returns profile from specified (okta) id
router.get(
  '/:profile_id',
  authRequired,
  checkProfileExist,
  function (req, res) {
    console.log(req.profile);
    res.status(200).json(req.profile);
  }
);

/*p*
 * @swagger
 * /profile:
 *  post:
 *    summary: Add a profile
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
router.post('/', authRequired, checkProfileObject, async (req, res) => {
  const profile = req.body;
  console.log("I'm back to the router!");
  // TO-DO: Implement Auth0 - check DB if specific Auth0 ID already exists
  // changed verification from findById(okta_id) to findBy(email)
  try {
    await Profiles.findBy({ email: profile.email }).then(async (pf) => {
      if (!pf[0]) {
        await Profiles.create(profile).then((profile) =>
          res
            .status(200)
            .json({ message: 'profile created', profile: profile[0] })
        );
      } else {
        res.status(400).json({ message: 'profile already exists' });
      }
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
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
  '/:profile_id',
  authRequired,
  checkProfileObject,
  checkProfileExist,
  ownerAuthorization('user'),
  (req, res) => {
    const changes = req.body;
    const { profile_id } = req.params;
    // TO-DO: Implement Auth0 - updates specific profile off Auth0 ID
    Profiles.update({ profile_id }, changes)
      .then((updated) => {
        res
          .status(200)
          .json({ message: 'profile updated', profile: updated[0] });
      })
      .catch((err) => {
        res.status(500).json({
          message: `Could not update profile '${profile_id}'`,
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

// TO-DO: Implement Auth0 delete profile based on /:id params
router.delete(
  '/:profile_id',
  authRequired,
  ownerAuthorization('user'),
  (req, res) => {
    const { profile_id } = req.params;
    try {
      Profiles.remove({ profile_id }).then(() => {
        res.status(200).json({
          message: `Profile '${profile_id}' was deleted.`,
          profile: req.user,
        });
      });
    } catch (err) {
      res.status(500).json({
        message: `Could not delete profile with ID: ${profile_id}`,
        error: err.message,
      });
    }
  }
);

module.exports = router;
