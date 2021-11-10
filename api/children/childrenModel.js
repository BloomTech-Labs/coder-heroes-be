const db = require('../../data/db-config');

const getChildren = async () => {
  return await db('children');
};

const findById = async (user_id) => {
  return db('children').where('user_id', user_id);
};

const addChildren = async (children) => {
  return db('children').insert(children).returning('*');
};

const removeChildren = async (children) => {
  return await db('children').where({ children }).del();
};

module.exports = {
  getChildren,
  findById,
  addChildren,
  removeChildren,
};
