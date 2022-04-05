exports.seed = function (knex) {
  return knex('calendar_events').insert([
    {
      date: '15/03/2022',
      time: '12:00 PM',
      type: 'warning',
      content: 'This is warning event.',
      details: 'Test information 1',
    },
    {
      date: '15/03/2022',
      time: '12:00 PM',
      type: 'success',
      content: 'This is usual event.',
      details: 'Test information 2',
    },
    {
      date: '16/03/2022',
      time: '12:00 PM',
      type: 'error',
      content: 'This is error event 1.',
      details: 'Test information 3',
    },
    {
      date: '16/03/2022',
      time: '12:00 PM',
      type: 'error',
      content: 'This is error event 2.',
      details: 'Test information 4',
    },
    {
      date: '16/03/2022',
      time: '12:00 PM',
      type: 'error',
      content: 'This is error event 3.',
      details: 'Test information 5',
    },
    {
      date: '12/04/2022',
      time: '12:00 PM',
      type: 'success',
      content: 'This is usual event1.',
      details: 'Test information 6',
    },
    {
      date: '12/04/2022',
      time: '12:00 PM',
      type: 'success',
      content: 'This is usual event2.',
      details: 'Test information 7',
    },
  ]);
};
