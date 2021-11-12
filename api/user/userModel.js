const db = require('../../data/db-config');

const findUserData = async (type, id) => {
  if (type === 1) {
    return db('profiles').leftJoin('admins', `${id}`, 'admins.user_id');
  } else if (type === 2) {
    return db('profiles').leftJoin('parents', `${id}`, 'parents.user_id');
  } else if (type === 3) {
    return db('profiles').leftJoin(
      'instructors',
      `${id}`,
      'instructors.user_id'
    );
  } else if (type === 4) {
    return db('profiles').leftJoin('children', `${id}`, 'children.user_id');
  }
};

const getInbox = (okta) => {
  return db('profiles')
    .leftJoin('inboxes', 'profiles.okta', 'inboxes.user_id')
    .leftJoin('messages', 'inboxes.id', 'messages.inbox_id')
    .where({ okta });
};

const getSchedule = (okta) => {
  return db('profiles')
    .leftJoin('parents', 'profiles.okta', 'parents.user_id')
    .leftJoin('children', 'parents.id', 'children.parent_id')
    .leftJoin('enrollments', 'children.id', 'enrollments.child_id')
    .leftJoin('schedules', 'enrollments.schedule_id', 'schedules.id')
    .where('profiles.okta', okta);
};

const updateUserData = (id, profile) => {
  return db('profiles')
    .where({ id: id })
    .first()
    .update(profile)
    .returning('*');
};

module.exports = {
  findUserData,
  getInbox,
  getSchedule,
  updateUserData,
};
