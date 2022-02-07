const db = require('../../data/db-config');

const findAll = async () => {
  return await db('profiles');
};

const findBy = (filter) => {
  return db('profiles').where(filter);
};

const findById = async (okta_id) => {
  return await db('profiles')
    .where('profiles.okta_id', okta_id)
    .first()
    .select('*');
};

const create = async (profile) => {
  return await db('profiles').insert(profile).returning('*');
};

const update = (okta_id, profile) => {
  return db('profiles')
    .where({ okta_id: okta_id })
    .first()
    .update(profile)
    .returning('*');
};

const remove = async (okta_id) => {
  return await db('profiles').where('profiles.okta_id', '=', okta_id).del();
};

const findOrCreateProfile = async (profileObj) => {
  const foundProfile = await findById(profileObj.okta_id).then(
    (profile) => profile
  );
  if (foundProfile) {
    return foundProfile;
  } else {
    return await create(profileObj).then((newProfile) => {
      return newProfile ? newProfile[0] : newProfile;
    });
  }
};

const findByRoleId = async (role_id) => {
  if (role_id == 1) {
    return await db('profiles').where('profiles.role_id', role_id);
  } else if (role_id == 2) {
    return await db('profiles').where('profiles.role_id', role_id);
  } else if (role_id == 3) {
    return await db('profiles')
      .rightJoin('instructors', 'profiles.profile_id', 'instructors.profile_id')
      .where('profiles.role_id', role_id);
  } else if (role_id == 4) {
    return await db('profiles')
      .rightJoin('parents', 'profiles.profile_id', 'parents.profile_id')
      .where('profiles.role_id', role_id);
  } else if (role_id == 5) {
    return await db('profiles')
      .rightJoin('children', 'profiles.profile_id', 'children.profiles_id')
      .where('profiles.role_id', role_id);
  }
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
  findOrCreateProfile,
  findByRoleId,
};
