const Messages = require('./inboxModel');

const emitMessages = async (socket) => {
  const response = await Messages.getInboxes();

  socket.emit('messagesFeed', response);
};

module.exports = { emitMessages };
