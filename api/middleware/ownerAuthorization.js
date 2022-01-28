const ownerAuthorization = ({ profile_id, role_id }) => (req, res, next) => {
  // pass in the profile that is the owner of what's being affected
  if (
    req.profile.profile_id === profile_id ||
    (role_id < 3 && req.profile.role_id < role_id)
  )
    next();
  else
    res
      .status(401)
      .json({ message: 'You are not authorized to take this action' });
};

module.exports = ownerAuthorization;
