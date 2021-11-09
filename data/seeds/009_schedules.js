exports.seed = function (knex) {
  return knex('schedules').insert([
    {
      size: 15,
      course_id: 1,
      instructor_id: 1,
    },
    {
      size: 12,
      course_id: 2,
      instructor_id: 2,
    },
    {
      size: 1,
      course_id: 3,
      instructor_id: 3,
    },
  ]);
};
