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
      title: 'Going to need to cancel.',
      message: 'My child has to miss the class',
      inbox_id: 9,
      sent_by_profile_id: 4,
    },
    {
      title: 'Kid is sick',
      read: true,
      message: 'Can we get a refund for this class?',
      inbox_id: 9,
      sent_by_profile_id: 10,
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
      message: "my achievement didn't pop up when I did class.",
      inbox_id: 5,
      sent_by_profile_id: 8,
    },
  ]);
};
