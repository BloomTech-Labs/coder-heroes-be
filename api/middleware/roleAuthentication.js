const roleAuthentication = (...args) => (req, res, next) => {
  // role type is inside req.profile.body
  const { type } = req.profile;
  let userType;
  if (type === 1) {
    userType = 'instructor';
  } else if (type === 2) {
    userType = 'parent';
  } else if (type === 3) {
    userType = 'admin';
  }
  //check to see if role matcheds the role that have access to the endpoint
  if ([...args].includes(userType)) {
    next();
  } else {
    res.status(404).json({ error: 'No Access' });
  }
};

module.exports = roleAuthentication;
