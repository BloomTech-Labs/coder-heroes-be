const db = require('../../data/db-config');

const getParentChildren = async (profile_id) => {
  return await db('parents')
    .leftJoin('children', 'parents.parent_id', 'children.parent_id')
    .where('parents.profile_id', profile_id);
};

const getChildSchedules = async (profile_id) => {
  return await db('parents')
    .leftJoin('children', 'parents.parent_id', 'children.parent_id')
    .leftJoin('enrollments', 'children.child_id', 'enrollments.child_id')
    .leftJoin('courses', 'enrollments.course_id', 'courses.course_id')
    .where('parents.profile_id', profile_id);
};

module.exports = {
  getParentChildren,
  getChildSchedules,
};
