const db = require('../../data/db-config');

const getParents = async () => {
  return await db('parents').leftJoin(
    'profiles',
    'parents.user_id',
    'profiles.okta'
  );
};

const findByParentId = async (id) => {
  return db('parents')
    .leftJoin('profiles', 'parents.user_id', 'profiles.okta')
    .where('parents.id', id);
};

const findByOkta = async (okta) => {
  return db('parents')
    .leftJoin('profiles', 'parents.user_id', 'profiles.okta')
    .where('parents.user_id', okta);
};

const getParentChildren = async (id) => {
  return db('parents')
    .leftJoin('children', 'parents.id', 'children.parent_id')
    .where('parents.id', id);
};

const getChildSchedules = async (id) => {
  return db('parents')
    .leftJoin('children', 'parents.id', 'children.parent_id')
    .leftJoin('enrollments', 'children.id', 'enrollments.child_id')
    .leftJoin('schedules', 'enrollments.schedule_id', 'schedules.id')
    .where('parents.id', id);
};

const addParent = async (parent) => {
  return await db('parents').insert(parent).returning('*');
};

const updateParent = async (user_id, parent) => {
  return await db('parents').where({ user_id }).update(parent);
};

const removeParent = async (id) => {
  return await db('parents').where({ id }).del();
};

module.exports = {
  getParents,
  findByParentId,
  findByOkta,
  getParentChildren,
  getChildSchedules,
  addParent,
  updateParent,
  removeParent,
};
