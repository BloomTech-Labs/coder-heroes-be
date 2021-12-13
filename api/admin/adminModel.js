const db = require('../../data/db-config');

const getAdmins = async () => {
  return await db('admins').leftJoin(
    'profiles',
    'admins.admin_id',
    'profiles.okta_id'
  );
};

const findByAdminId = async (id) => {
  return db('admins')
    .leftJoin('profiles', 'admins.admin_id', 'profiles.okta_id')
    .where('admins.admin_id', id);
};

const findByOkta = async (okta) => {
  return db('admins')
    .leftJoin('profiles', 'admins.admin_id', 'profiles.okta_id')
    .where('admins.admin_id', okta);
};

const addAdmin = async (admin) => {
  return await db('admins').insert(admin).returning('*');
};

const updateAdmin = async (id, admin) => {
  return await db('admins').where('admin_id', id).update(admin);
};

const removeAdmin = async (id) => {
  return await db('admins').where('admin_id', id).del();
};

module.exports = {
  getAdmins,
  findByAdminId,
  findByOkta,
  addAdmin,
  updateAdmin,
  removeAdmin,
};
