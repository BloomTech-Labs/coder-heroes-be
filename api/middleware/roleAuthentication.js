// Only allows endpoint access for Super Admins (1), Admins (2), and Instructors (3)
const roleAuthenticationInstructor = (req, res, next) => {
  const role_id = req.profile.role_id;
  if (role_id === 1 || role_id === 2 || role_id === 3) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = { roleAuthenticationInstructor };
