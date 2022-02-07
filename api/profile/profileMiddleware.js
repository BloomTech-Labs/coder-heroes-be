const Profiles = require('./profileModel');

const checkProfileObject = (req, res, next) => {
  const { email, name, okta_id, role_id, avatarUrl } = req.body;
  if (!role_id) next({ status: 400, message: 'role_id is required' });
  if (!email) next({ status: 400, message: 'email is required' });
  if (!name) next({ status: 400, message: 'name is required' });
  if (!okta_id) next({ status: 400, message: 'okta_id is required' });
  if (
    typeof role_id !== 'number' ||
    typeof email !== 'string' ||
    typeof name !== 'string' ||
    typeof okta_id !== 'string'
  )
    next({
      status: 400,
      message:
        'variables in the request body must all be of type string except role_id must be of type number',
    });
  if (email.length > 255 || name.length > 255 || okta_id.length > 255)
    next({
      status: 400,
      message:
        'strings sent in the request body must not exceed a length of 255 characters',
    });
  if (typeof avatarUrl !== 'string' || avatarUrl.length > 255)
    req.body.avatarUrl = null;

  next();
};

const checkProfileExist = async (req, res, next) => {
  const id = req.params.profile_id;
  const foundProfile = await Profiles.findByProfileId(id);
  if (!foundProfile) {
    next({ status: 404, message: `profile with id ${id} is not found ` });
  } else {
    req.profile = foundProfile;
    next();
  }
};

const checkRoleExist = async (req, res, next) => {
  const role = req.params.role_id;
  if (role >= 1 || role <= 5) {
    next();
  } else {
    next({ status: 404, message: `No such role exists` });
  }
};

module.exports = {
  checkProfileObject,
  checkProfileExist,
  checkRoleExist,
};
