const db = require('../../data/db-config');

const getNewsfeed = async () => {
  return await db('newsfeed');
};

const findByNewsfeedId = async (newsfeed_id) => {
  return db('newsfeed').where({ newsfeed_id });
};

const addNewsfeed = async (newsfeed) => {
  return await db('newsfeed').insert(newsfeed).returning('*');
};

const updateNewsfeed = async (newsfeed_id, newsfeed) => {
  return await db('newsfeed').where({ newsfeed_id }).update(newsfeed);
};

const removeNewsfeed = async (newsfeed_id) => {
  return await db('newsfeed').where({ newsfeed_id }).del();
};

module.exports = {
  getNewsfeed,
  findByNewsfeedId,
  addNewsfeed,
  updateNewsfeed,
  removeNewsfeed,
};
