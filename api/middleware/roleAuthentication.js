const roleAuthentication = (...args) => (req, res, next) => {
  // role type is inside req.profile.body
  const { role } = req.profile;
  console.log(role);
  //check to see if role matcheds the role that have access to the endpoint
  if (args.includes(role)) {
    next();
  } else {
    res.status(401).json({ error: 'No Access' });
  }
};

const roles = ['child', 'parent', 'instructor', 'admin', 'super_admin'];

module.exports = { roleAuthentication, roles };
