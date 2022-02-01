const { findById } = require('../profile/profileModel');

const checkParentObject = async (req, res, next) => {
  const { profile_id } = req.body;
  if (!profile_id) next({ status: 400, message: 'profile_id is required' });
  if (typeof profile_id !== 'number')
    next({ status: 400, message: 'profile_id must be of type number' });
  const profile = await findById(profile_id);
  if (!profile)
    next({
      status: 400,
      message: `profile with id ${profile_id} does not exist`,
    });

  next();
};

module.exports = {
  checkParentObject,
};
