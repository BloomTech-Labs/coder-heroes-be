const db = require('../../data/db-config');

const findUserData = async (type, id) => {
  if (type === 1) {
    return db('profiles')
      .leftJoin('admins', 'profiles.okta_id', 'admins.profile_id')
      .where('okta_id', id);
  } else if (type === 2) {
    return db('profiles')
      .leftJoin('parents', 'profiles.okta_id_id', 'parents.profile_id')
      .where('okta_id', id);
  } else if (type === 3) {
    return db('profiles')
      .leftJoin('instructors', 'profiles.okta_id', 'instructors.profile_id')
      .where('okta_id', id);
  } else if (type === 4) {
    return db('profiles')
      .leftJoin('children', 'profiles.okta_id', 'children.profile_id')
      .where('okta_id', id);
  }
};

const getInbox = (okta) => {
  return db('profiles')
    .leftJoin('inboxes', 'profiles.okta_id', 'inboxes.user_id')
    .leftJoin('messages', 'inboxes.id', 'messages.inbox_id')
    .where({ okta });
};

const getSchedule = (okta) => {
  return db('profiles')
    .leftJoin('parents', 'profiles.okta_id', 'parents.profile_id')
    .leftJoin('children', 'parents.parent_id', 'children.parent_id')
    .leftJoin('enrollments', 'children.child_id', 'enrollments.child_id')
    .leftJoin('classes', 'enrollments.class_id', 'classes.class_id')
    .where('profiles.okta_id', okta);
};

const updateUserData = (id, profile) => {
  return db('profiles').where('okta_id', id).update(profile).returning('*');
};

module.exports = {
  findUserData,
  getInbox,
  getSchedule,
  updateUserData,
};
