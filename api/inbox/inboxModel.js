const db = require('../../data/db-config');

const getConversations = async () => {
  return db('conversations');
};

const findByProfileId = async (profile_id) => {
  return db('conversations')
    .select('conversation_id', 'profile_id')
    .where('profile_id', profile_id)
    .first();
};

const findByConversationId = async (conversation_id) => {
  const test = await db('conversations')
    .select('conversation_id')
    .where('conversation_id', conversation_id);
  console.log('test.length: ', test.length);
  if (test.length) {
    return db('messages')
      .select(
        'messages_id',
        'sent_at',
        'title',
        'message',
        'sent_by_profile_id',
        'conversation_id'
      )
      .where('conversation_id', conversation_id);
  } else {
    return test;
  }
};

const addConversation = async (conversation) => {
  return db('conversations').insert(conversation);
};

const addMessage = async (message) => {
  return db('messages').insert(message);
};

const updateMessage = (messages_id, message) => {
  return db('messages').where('messages_id', messages_id).update(message);
};

const removeConversation = async (conversation_id) => {
  return db('conversations').where('conversation_id', conversation_id).delete();
};

module.exports = {
  getConversations,
  findByProfileId,
  findByConversationId,
  addConversation,
  addMessage,
  updateMessage,
  removeConversation,
};
