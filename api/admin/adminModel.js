const db = require('../../data/db-config');

const getAdmins = async () => {
  return await db('admins').leftJoin(
    'profiles',
    'admins.user_id',
    'profiles.okta'
  );
};

const findByAdminId = async (id) => {
  return db('admins')
    .leftJoin('profiles', 'admins.user_id', 'profiles.okta')
    .where('admins.id', id);
};

const findByOkta = async (okta) => {
  return db('admins')
    .leftJoin('profiles', 'admins.user_id', 'profiles.okta')
    .where('admins.user_id', okta);
};

const addAdmin = async (admin) => {
  return await db('admins').insert(admin).returning('*');
};

const updateAdmin = async (id, admin) => {
  return await db('admins').where({ id }).update(admin);
};

const removeAdmin = async (id) => {
  return await db('admins').where({ id }).del();
};

module.exports = {
  getAdmins,
  findByAdminId,
  findByOkta,
  addAdmin,
  updateAdmin,
  removeAdmin,
};
