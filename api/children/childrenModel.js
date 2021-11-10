const db = require('../../data/db-config');

const getChildren = async () => {
  return await db('children');
};

const findById = async (id) => {
  return db('children').where({ id });
};

const addChildren = async (children) => {
  return db('children').insert(children).returning('*');
};

const removeChildren = async (children) => {
  return await db('children').where({ children }).del();
};

const updateChildren = (id, children) => {
  return db('children').where({ id }).first().update(children).returning('*');
};

module.exports = {
  getChildren,
  findById,
  addChildren,
  removeChildren,
  updateChildren,
};
