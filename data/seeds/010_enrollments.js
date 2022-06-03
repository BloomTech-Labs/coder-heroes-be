exports.seed = function (knex) {
  return knex('enrollments').insert([
    { child_id: 1, course_id: 1, completed: false },
    { child_id: 1, course_id: 2, completed: true },
  ]);
};
