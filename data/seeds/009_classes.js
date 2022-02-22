exports.seed = function (knex) {
  return knex('classes').insert([
    {
      class_name: 'App Building Fundamentals',
      class_description:
        'A month-long course where students with design, build, and deploy an app from beginning to end!',
      day_of_week: 'Monday',
      max_size: 20,
      min_age: 7,
      max_age: 12,
      instructor_id: 1,
      program_id: 1,
      start_time: '08:00:00',
      end_time: '12:30:00',
      start_date: '04/04/2022',
      end_date: '04/28/2022',
      location: "Children's Coding Center",
      number_of_sessions: '4',
    },
  ]);
};
