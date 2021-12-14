const roleAuthentication = (...args) => (req, res, next) => {
  // role type is inside req.profile.body
  const { role } = req.profile;
  let user_role;
  if (role === 1) {
    user_role = 'super_admin';
  } else if (role === 2) {
    user_role = 'admin';
  } else if (role === 3) {
    user_role = 'instructor';
  } else if (role === 4) {
    user_role = 'parent';
  } else if (role === 5) {
    user_role = 'child';
  }
  //check to see if role matcheds the role that have access to the endpoint
  if ([...args].includes(user_role)) {
    next();
  } else {
    res.status(404).json({ error: 'No Access' });
  }
};

module.exports = roleAuthentication;
