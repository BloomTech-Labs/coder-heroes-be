// const createError = require('http-errors');
// const Profiles = require('../profile/profileModel');
/**
 * TO-DO: Implement Auth0
 * If token verification fails
 * catch(err) => next(createError(401, err.message));
 */

/**
 * A simple middleware that asserts valid Okta idToken and sends 401 responses
 * if the token is not present or fails validation. If the token is valid its
 * contents are attached to req.profile
 */
const authRequired = async (req, res, next) => {
  // TO-DO: Implement Auth0 -> assure authorized through Header Token

  // const match = authHeader.match(/Bearer (.+)/);
  // if (!match) throw new Error('Missing idToken');
  // req.profile = authorizedProfile;
  next();
};

module.exports = authRequired;
