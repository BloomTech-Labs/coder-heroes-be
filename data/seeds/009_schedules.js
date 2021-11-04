exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('schedules')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('schedules').insert([
        {
          course_id: 0,
          start_time: '5:00pm',
          start_date: '10-10-2010',
          end_date: '10-10-2010',
          end_time: '6:00pm',
          location: 'Alabamma',
          instructor_id: 1,
        },
        {
          course_id: 1,
          start_time: '6:00pm',
          start_date: '10-10-2010',
          end_date: '10-10-2010',
          end_time: '7:00pm',
          location: 'Alabamma',
          instructor_id: 2,
        },
        {
          course_id: 2,
          start_time: '7:00pm',
          start_date: '10-10-2010',
          end_date: '10-10-2010',
          end_time: '8:00pm',
          location: 'Alabamma',
          instructor_id: 0,
        },
      ]);
    });
};
