const db = require('../../data/db-config');

const getParentChildren = async (profile_id) => {
  return db('parents')
    .leftJoin('children', 'parents.parent_id', 'children.parent_id')
    .leftJoin('profiles', 'profiles.profile_id', 'children.profile_id')
    .where('parents.profile_id', profile_id);
};

const getChildSchedules = (profile_id) => {
  return db('parents')
    .leftJoin('children', 'parents.parent_id', 'children.parent_id')
    .leftJoin('enrollments', 'children.child_id', 'enrollments.child_id')
    .leftJoin('courses', 'enrollments.course_id', 'courses.course_id')
    .where('parents.profile_id', profile_id);
};

module.exports = {
  getParentChildren,
  getChildSchedules,
};
