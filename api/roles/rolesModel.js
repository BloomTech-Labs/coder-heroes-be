const db = require('../../data/db-config');

const getRoles = async () => {
  return await db('roles');
};
module.exports = { getRoles };
