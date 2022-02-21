const db = require('../../data/db-config');

const getRoles = async () => {
  return await db('roles');
};

const getRoleById = async (role) => {
  return await getRoles().where({ role_id: role }).first().role_name;
};
module.exports = { getRoles, getRoleById };
