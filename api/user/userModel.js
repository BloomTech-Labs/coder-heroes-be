const db = require('../../data/db-config');

const findUserData = async (type, id) => {
  if (type === '1') {
    return db('profiles').leftJoin('admins', `${id}`, 'admins.user_id');
  } else if (type === '2') {
    return db('profiles').leftJoin('admins', `${id}`, 'admins.user_id');
  }
};

const updateUserData = (id, profile) => {
  console.log(profile);
  return db('profiles')
    .where({ id: id })
    .first()
    .update(profile)
    .returning('*');
};

module.exports = {
  findUserData,
  updateUserData,
};
