const db = require('../../data/db-config');
// id:
// title:
// link:
// description:

const getNewsfeed = async () => {
  return await db('newsfeed');
};

const findByNewsfeedId = async (id) => {
  return db('newsfeed').where({ id });
};

const addNewsfeed = async (newsfeed) => {
  return await db('newsfeed').insert(newsfeed).returning('*');
};

const updateNewsfeed = async (id, newsfeed) => {
  return await db('newsfeed').where({ id }).update(newsfeed);
};

const removeNewsfeed = async (id) => {
  return await db('newsfeed').where({ id }).del();
};

module.exports = {
  getNewsfeed,
  findByNewsfeedId,
  addNewsfeed,
  updateNewsfeed,
  removeNewsfeed,
};
