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
  // const idk = await db('conversations')
  // .select('conversation_id', 'profile_id')
  // .where('conversation_id', conversation_id)
  // .first();

  const messages = await db('messages')
    .select(
      'messages_id',
      'sent_at',
      'title',
      'message',
      'sent_by_profile_id',
      'conversation_id'
    )
    .where('conversation_id', conversation_id);

  return messages;

  // return idk;
  // return db('conversations')
  //   .select('conversation_id', 'profile_id')
  //   .where('conversation_id', conversation_id)
  //   .first();
};

const addConversation = async (conversation) => {
  return db('conversations').insert(conversation);
};

const addMessage = async (message) => {
  return db('messages').insert(message);
};

const updateConversation = (profile_id, conversation) => {
  return db('conversations')
    .where('profile_id', profile_id)
    .update(conversation);
};

const removeConversation = async (profile_id) => {
  return db('conversations').where('profile_id', profile_id).delete();
};

module.exports = {
  getConversations,
  findByProfileId,
  findByConversationId,
  addConversation,
  addMessage,
  updateConversation,
  removeConversation,
};
