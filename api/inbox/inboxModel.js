const db = require('../../data/db-config');

const getInboxes = async () => {
  return await db('inboxes')
    .leftJoin('profiles', 'inboxes.profile_id', '=', 'profiles.okta')
    .innerJoin('messages', 'inboxes.inbox_id', '=', 'messages.inbox_id');
};

const findByProfileId = async (profile_id) => {
  return db('inboxes')
    .innerJoin('messages', 'inboxes.inbox_id', '=', 'messages.inbox_id')
    .where({ profile_id });
};

const findByInboxId = async (inbox_id) => {
  return db('inboxes').where('id', inbox_id);
};

const addInbox = async (inbox) => {
  return db('inboxes').insert(inbox).returning('*');
};

const addMessage = async (message) => {
  return db('messages').insert(message).returning('*');
};

const updateInbox = (profile_id, inbox) => {
  return db('inboxes').where({ profile_id }).update(inbox).returning('*');
};

const removeInbox = async (profile_id) => {
  return await db('inboxes').where({ profile_id }).del();
};

module.exports = {
  getInboxes,
  findByProfileId,
  findByInboxId,
  addInbox,
  addMessage,
  updateInbox,
  removeInbox,
};
