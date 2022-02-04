const { getRoleById } = require('../roles/rolesModel');

const roleAuthentication = async (...args) => (req, res, next) => {
  req.profile.role = getRoleById(req.profile.role_id);
  const { role } = req.profile;
  if ([...args].includes(role)) {
    next();
  } else {
    res.status(401).json({ error: 'No Access' });
  }
};

const roles = ['child', 'parent', 'instructor', 'admin', 'super_admin'];

module.exports = { roleAuthentication, roles };
