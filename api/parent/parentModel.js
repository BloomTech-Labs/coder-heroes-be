const db = require('../../data/db-config');

const getParentChildren = async (parent_id) => {
  return await db('parents')
    .leftJoin('children', 'parents.parent_id', 'children.parent_id')
    .where('parents.parent_id', parent_id);
};

const getChildSchedules = async (id) => {
  return await db('parents')
    .leftJoin('children', 'parents.parent_id', 'children.parent_id')
    .leftJoin('enrollments', 'children.child_id', 'enrollments.child_id')
    .leftJoin('classes', 'enrollments.class_id', 'classes.class_id')
    .where('parents.parent_id', id);
};

module.exports = {
  getParentChildren,
  getChildSchedules,
};
