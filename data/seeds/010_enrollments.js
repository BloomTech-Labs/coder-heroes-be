exports.seed = function (knex) {
  return knex('enrollments').insert([
    { child_id: 1, course_id: 1},
    { child_id: 1, course_id: 2, completed: true },
    { child_id: 1, course_id: 3, completed: true },
    { child_id: 2, course_id: 3, completed: true },
    { child_id: 3, course_id: 1, completed: true },
    { child_id: 3, course_id: 4, completed: true },
  ]);
};
