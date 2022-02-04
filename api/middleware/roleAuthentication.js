const { getRoles } = require('../roles/rolesModel');

const roleAuthentication = async (...args) => (req, res, next) => {
  req.profile.role = getRoles()
    .where({ role_id: req.profile.role_id })
    .first().role_name;
  const { role } = req.profile;
  if ([...args].includes(role)) {
    next();
  } else {
    res.status(401).json({ error: 'No Access' });
  }
};

const roles = ['child', 'parent', 'instructor', 'admin', 'super_admin'];

module.exports = { roleAuthentication, roles };
