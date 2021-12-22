const db = require('../../data/db-config');

const getParents = async () => {
  return await db('parents').leftJoin(
    'profiles',
    'parents.profile_id',
    'profiles.profile_id'
  );
};

const findByParentId = async (profile_id) => {
  return db('parents')
    .leftJoin('profiles', 'parents.profile_id', 'profiles.profile_id')
    .where('parents.profile_id', profile_id);
};

const getParentChildren = async (parent_id) => {
  return db('parents')
    .leftJoin('children', 'parents.parent_id', 'children.parent_id')
    .where('parents.parent_id', parent_id);
};

const getChildSchedules = async (id) => {
  return db('parents')
    .leftJoin('children', 'parents.parent_id', 'children.parent_id')
    .leftJoin('enrollments', 'children.child_id', 'enrollments.child_id')
    .leftJoin('classes', 'enrollments.class_id', 'classes.class_id')
    .where('parents.parent_id', id);
};

const addParent = async (parent) => {
  return await db('parents').insert(parent).returning('*');
};

const updateParent = async (parent_id, parent) => {
  return await db('parents')
    .where('parents.parent_id', parent_id)
    .update(parent);
};

const removeParent = async (profile_id) => {
  return await db('parents').where('parents.profile_id', profile_id).del();
};

module.exports = {
  getParents,
  findByParentId,
  getParentChildren,
  getChildSchedules,
  addParent,
  updateParent,
  removeParent,
};
