exports.seed = function (knex) {
  return knex('schedules').insert([
    {
      course_id: 1,
      instructor_id: 1,
    },
    {
      course_id: 2,
      instructor_id: 2,
    },
    {
      course_id: 3,
      instructor_id: 3,
    },
  ]);
};
