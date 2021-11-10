const db = require('../../data/db-config');

const getAdmins = async () => {
  return await db('admins').leftJoin(
    'profiles',
    'admins.user_id',
    'profiles.key'
  );
};

const findByAdminId = async (id) => {
  return db('admins')
    .leftJoin('profiles', 'admins.user_id', 'profiles.key')
    .where('admins.id', id);
};

const findByUserId = async (id) => {
  return db('admins')
    .leftJoin('profiles', 'admins.user_id', 'profiles.key')
    .where('admins.user_id', id);
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
  findByUserId,
  addAdmin,
  updateAdmin,
  removeAdmin,
};
