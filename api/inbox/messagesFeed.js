const emitMessages = (socket) => {
  const response = new Date();

  socket.emit('messagesFeed', response);
};

module.exports = { emitMessages };
