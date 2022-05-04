const db = require('../../data/db-config');

const findById = (profile_id) => {
  return db('parents').where({ profile_id }).first();
};

const findOrCreateParent = async (profile_id) => {
  const profile = await findById(profile_id);
  if (profile) {
    return profile;
  } else {
    const [parent] = await db('parents').insert({ profile_id }).returning('*');
    return parent;
  }
};

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
  findById,
  findOrCreateParent,
};
