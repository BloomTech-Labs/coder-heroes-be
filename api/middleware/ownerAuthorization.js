// pass in the key parameter to the profile that is the owner of what's being affected
const ownerAuthorization = () => (req, res, next) => {
  // TO-DO: Implement Auth0 - check that the role_id matches the key passed

  // if (
  //   req.profile.profile_id === req[key].profile_id ||
  //   (req.profile.role_id < 3 && req.profile.role_id < (req[key].role_id || 3))
  // )
  //   next();
  // else
  //   res
  //     .status(401)
  //     .json({ message: 'You are not authorized to take this action' });
  next();
};

module.exports = ownerAuthorization;
