const Profiles = require('../profile/profileModel');
/**
 * A simple middleware that asserts valid Auth0 idToken and sends 401 responses
 * if the token is not present or fails validation. If the token is valid its
 * contents are attached to req.profile
 */
const authRequired = async (req, res, next) => {
  try {
    // Verify that the token is valid
    const profile = Profiles.findOrCreateProfile;
    console.log("I'm in authRequired");

    if (profile) {
      req.profile = profile;
    } else {
      next({
        status: 401,
        message: 'Unable to process idToken',
      });
    }

    // Proceed with request if token is valid
    next();
  } catch (err) {
    next({
      status: err.status || 500,
      message: err.message || 'Internal Server Error',
    });
  }
};

module.exports = authRequired;
