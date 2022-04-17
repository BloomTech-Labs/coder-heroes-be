const db = require('../../data/db-config');

const getInboxes = async () => {
  return db('inboxes');
};

const findByProfileId = async (profile_id) => {
  return db('inboxes')
    .select('inbox_id', 'profile_id')
    .where('profile_id', profile_id)
    .first();
};

const findByInboxId = async (inbox_id) => {
  return db('inboxes')
    .select('inbox_id', 'profile_id')
    .where('inbox_id', inbox_id)
    .first();
};

const addInbox = async (inbox) => {
  return db('inboxes').insert(inbox);
};

const addMessage = async (message) => {
  return db('messages').insert(message);
};

const updateInbox = (profile_id, inbox) => {
  return db('inboxes').where('profile_id', profile_id).update(inbox);
};

const removeInbox = async (profile_id) => {
  return db('inboxes').where('profile_id', profile_id).delete();
};

const getInboxMessages = async (inbox_id) => {
  const messages = await db('messages').where('inbox_id', inbox_id);
  return messages;
};

module.exports = {
  getInboxes,
  findByProfileId,
  findByInboxId,
  addInbox,
  addMessage,
  updateInbox,
  removeInbox,
  getInboxMessages,
};
