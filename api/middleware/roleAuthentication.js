const roleAuthentication = (...args) => (req, res, next) => {
  // role type is inside req.profile.body
  const { role } = req.profile;
  //check to see if role matcheds the role that have access to the endpoint
  if ([...args].includes(role)) {
    next();
  } else {
    res.status(404).json({ error: 'No Access' });
  }
};

const roles = ['child', 'parent', 'instructor', 'admin', 'super_admin'];

module.exports = { roleAuthentication, roles };
