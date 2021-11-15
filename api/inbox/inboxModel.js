const db = require('../../data/db-config');

const getInboxes = async () => {
  return await db('inboxes')
    .leftJoin('profiles', 'inboxes.user_id', 'profiles.okta')
    .innerJoin('messages', 'inboxes.id', 'messages.inbox_id');
};

const findByUserId = async (user_id) => {
  return db('inboxes')
    .innerJoin('messages', 'inboxes.id', 'messages.inbox_id')
    .where({ user_id });
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

const updateInbox = (user_id, inbox) => {
  return db('inboxes').where({ user_id }).update(inbox).returning('*');
};

const removeInbox = async (user_id) => {
  return await db('inboxes').where({ user_id }).del();
};

module.exports = {
  getInboxes,
  findByUserId,
  findByInboxId,
  addInbox,
  addMessage,
  updateInbox,
  removeInbox,
};
