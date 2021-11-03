exports.seed = function (knex) {
      return knex('messages').insert([
      {
        sent_at: '2021-11-02T01:51:39+00:00',
        title: 'Help with Homework?',
        read: true,
        message: 'I need the answers to the assignment please.',
        inbox_id: 0,
        sender_id: 1,
      },
      {
        sent_at: '2021-11-02T01:51:39+00:00',
        title: "What's my grade?",
        read: true,
        message: 'Hey Ms. Teacher can you tell me my grade?',
        inbox_id: 0,
        sender_id: 1,
      },
      {
        sent_at: '2021-11-02T01:51:39+00:00',
        title: 'Going to need to cancel.',
        read: false,
        message: 'My child has to miss the class',
        inbox_id: 1,
        sender_id: 2,
      },
      {
        sent_at: '2021-11-02T01:51:39+00:00',
        title: 'Kid is sick',
        read: true,
        message: 'Can we get a refund for this class?',
        inbox_id: 2,
        sender_id: 3,
      },
      {
        sent_at: '2021-11-02T01:51:39+00:00',
        title: 'When is class?',
        read: false,
        message: 'I noticed the time was funky and had to ask.',
        inbox_id: 1,
        sender_id: 5,
      },
      {
        sent_at: '2021-11-02T01:51:39+00:00',
        title: 'Is this a yoga course?',
        read: false,
        message: 'How is yoga and coding taught together?',
        inbox_id: 3,
        sender_id: 7,
      },
      {
        sent_at: '2021-11-02T01:51:39+00:00',
        title: 'Where is my achievement?',
        read: false,
        message: "my achievement didn't pop up when I did class.",
        inbox_id: 0,
        sender_id: 1,
      }
  ])
};
