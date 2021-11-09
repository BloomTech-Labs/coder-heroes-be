const db = require('../../data/db-config');

const findAll = async () => {
  return await db('profiles');
};

const findBy = (filter) => {
  return db('profiles').where(filter);
};

const findById = async (okta) => {
  return db('profiles').where({ okta }).first().select('*');
};

const create = async (profile) => {
  return db('profiles').insert(profile).returning('*');
};

const update = (okta, profile) => {
  console.log(profile);
  return db('profiles')
    .where({ okta: okta })
    .first()
    .update(profile)
    .returning('*');
};

const remove = async (okta) => {
  return await db('profiles').where({ okta }).del();
};

const findOrCreateProfile = async (profileObj) => {
  const foundProfile = await findById(profileObj.okta).then(
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

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
  findOrCreateProfile,
};
