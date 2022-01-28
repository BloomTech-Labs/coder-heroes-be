// pass in the key to the profile that is the owner of what's being affected
const ownerAuthorization = (key) => (req, res, next) => {
  if (
    req.profile.profile_id === req[key].profile_id ||
    (req.profile.role_id < 3 && req.profile.role_id < (req[key].role_id || 3))
  )
    next();
  else
    res
      .status(401)
      .json({ message: 'You are not authorized to take this action' });
};

module.exports = ownerAuthorization;
