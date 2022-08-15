const db = require('../../data/db-config'); /* eslint-disable */

const getNewsfeed = async () => {
  return await db('newsfeed').orderBy('posted_at', 'desc');
};

const findByNewsfeedId = async (newsfeed_id) => {
  return await db('newsfeed')
    .select('*')
    .where('newsfeed_id', newsfeed_id)
    .first();
};

const addNewsfeed = async (newsfeed) => {
  return await db('newsfeed').insert(newsfeed).returning('*');
};

const updateNewsfeed = async (newsfeed_id, newsfeed) => {
  return await db('newsfeed')
    .where('newsfeed_id', newsfeed_id)
    .first()
    .update(newsfeed);
};

const removeNewsfeed = async (newsfeed_id) => {
  return await db('newsfeed').where('newsfeed_id', newsfeed_id).delete();
};

module.exports = {
  getNewsfeed,
  findByNewsfeedId,
  addNewsfeed,
  updateNewsfeed,
  removeNewsfeed,
};
