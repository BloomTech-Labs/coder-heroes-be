const db = require('../../data/db-config');

const getAdmins = async () => {
  return await db('admins').leftJoin(
    'profiles',
    'admins.profile_id',
    '=',
    'profiles.profile_id'
  );
};

const findByAdminId = async (id) => {
  return await db('admins')
    .join('profiles', 'admins.profile_id', 'profiles.profile_id')
    .where('admins.admin_id', id)
    .first();
};

const addAdmin = async (admin) => {
  // we are makeing okta_id as payload we need to figure out away to save it from sever
  /*payload  {
    "email": "asdfasdf@maildrop.cc",
    "name": "eooas User",
    "okta_id": "00ulthapbErVUwasdt4x11",
    "role_id": 2
  }
  ==> make sure to look at the adminMiddleware.js and make changes there
  */
  const newProfile = await db('profiles').insert(admin).returning('*');
  const newAdmin = await db('admins')
    .insert({ profile_id: newProfile[0]['profile_id'] })
    .returning('*');
  return await findByAdminId(newAdmin[0].admin_id);
};

const updateAdmin = async (admin_profile_id, admin, id) => {
  await db('profiles')
    .leftJoin('admins', 'admins.profile_id', 'profiles.profile_id')
    .where('profile_id', admin_profile_id)
    .update(admin);
  return await findByAdminId(id);
};

const removeAdmin = async (id) => {
  const deletedadmn = await findByAdminId(id);
  await db('admins').where('admin_id', id).del();
  await db('profiles').where('profile_id', deletedadmn.profile_id).del();
  return deletedadmn;
};

module.exports = {
  getAdmins,
  findByAdminId,
  addAdmin,
  updateAdmin,
  removeAdmin,
};
