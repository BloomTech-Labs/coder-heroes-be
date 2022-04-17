exports.seed = function (knex) {
  return knex('messages').insert([
    {
      title: 'Help with Homework?',
      read: true,
      message: 'I need the answers to the assignment please.',
      inbox_id: 7,
      sent_by_profile_id: 1,
    },
    {
      title: "What's my grade?",
      read: true,
      message: 'Hey Ms. Teacher can you tell me my grade?',
      inbox_id: 7,
      sent_by_profile_id: 5,
    },
    {
      title: 'When is class?',
      message: 'I noticed the time was funky and had to ask.',
      inbox_id: 8,
      sent_by_profile_id: 4,
    },
    {
      title: 'Is this a yoga course?',
      message: 'How is yoga and coding taught together?',
      inbox_id: 4,
      sent_by_profile_id: 1,
    },
    {
      title: 'Where is my achievement?',
      message: "my achievement didn't pop up when I did course.",
      inbox_id: 5,
      sent_by_profile_id: 8,
    },
    {
      title: 'socket test',
      message: 'data emission test',
      inbox_id: 2,
      sent_by_profile_id: 3,
    },
  ]);
};
