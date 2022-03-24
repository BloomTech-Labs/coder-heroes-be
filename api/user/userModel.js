const db = require('../../data/db-config');

const findUserData = async (role_id, profile_id) => {
  if (role_id === 1) {
    return db('profiles')
      .leftJoin(
        'super_admins',
        'profiles.profile_id',
        'super_admins.profile_id'
      )
      .where('super_admins.profile_id', profile_id);
  } else if (role_id === 2) {
    return db('profiles')
      .leftJoin('parents', 'profiles.profile_id', 'parents.profile_id')
      .where('parents.profile_id', profile_id);
  } else if (role_id === 3) {
    return db('profiles')
      .leftJoin('instructors', 'profiles.profile_id', 'instructors.profile_id')
      .where('instructors.profile_id', profile_id);
  } else if (role_id === 4) {
    return db('profiles')
      .leftJoin('parents', 'profiles.profile_id', 'parents.profile_id')
      .where('parents.profile_id', profile_id);
  } else if (role_id === 5) {
    return db('profiles')
      .leftJoin('children', 'profiles.profile_id', 'children.profile_id')
      .where('children.profile_id', profile_id);
  }
};

const getInbox = (okta) => {
  return db('profiles')
    .leftJoin('inboxes', 'profiles.profile_id', 'inboxes.profile_id')
    .leftJoin('messages', 'inboxes.inbox_id', 'messages.inbox_id')
    .where({ okta });
};

const getSchedule = (okta) => {
  return db('profiles')
    .leftJoin('parents', 'profiles.profile_id', 'parents.profile_id')
    .leftJoin('children', 'parents.parent_id', 'children.parent_id')
    .leftJoin('enrollments', 'children.child_id', 'enrollments.child_id')
    .leftJoin('courses', 'enrollments.course_id', 'courses.course_id')
    .where('profiles.profile_id', okta);
};

const updateUserData = (profile_id, updated_profile) => {
  return db('profiles')
    .where('profile_id', profile_id)
    .update(updated_profile)
    .returning('*');
};

module.exports = {
  findUserData,
  getInbox,
  getSchedule,
  updateUserData,
};
