/*
  Roles:
  1 - super_admin
  2 - admin  
  3 - instructor
  4 - parent
  5 - child
*/

// TO-DO: Implement Auth0 - req.body.role_id -> req.profile.role_id (set after checking from AuthRequired middleware)
// Only allows endpoint access for Super Admins (1), Admins (2), and Instructors (3)
const roleAuthenticationInstructor = (req, res, next) => {
  const role_id = req.body.role_id;
  if (role_id === 1 || role_id === 2 || role_id === 3) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Only allows endpoint access for Super Admins (1), Admins (2), and Parents (4)
const roleAuthenticationParent = (req, res, next) => {
  const role_id = req.body.role_id;
  if (role_id === 1 || role_id === 2 || role_id === 4) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Only allows endpoint access for Super Admins (1), Admins (2), and Students (5)
const roleAuthenticationStudent = (req, res, next) => {
  const role_id = req.body.role_id;
  if (role_id === 1 || role_id === 2 || role_id === 5) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = {
  roleAuthenticationInstructor,
  roleAuthenticationParent,
  roleAuthenticationStudent,
};
