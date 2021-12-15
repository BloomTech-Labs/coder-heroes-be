exports.seed = function (knex) {
  return knex('classes').insert([
    {
      size: 15,
      open_seats_remaining: 5,
      course_type_id: 1,
      instructor_id: 1,
      start_time: '5:00pm',
      start_date: '10-10-2010',
      end_date: '10-10-2010',
      end_time: '6:00pm',
      location: 'https://zoom.us/my/john123',
    },
    {
      size: 10,
      open_seats_remaining: 10,
      course_type_id: 2,
      instructor_id: 2,
      start_time: '5:00pm',
      start_date: '10-10-2010',
      end_date: '10-10-2010',
      end_time: '6:00pm',
      location: 'https://zoom.us/my/john123',
    },
  ]);
};
