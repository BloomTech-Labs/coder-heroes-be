exports.seed = function (knex) {
  return knex('enrollments').insert([
    { child_id: 1, schedule_id: 1 },
    { child_id: 1, schedule_id: 2, completed: true },
    { child_id: 1, schedule_id: 3, completed: true },
    { child_id: 2, schedule_id: 3, completed: true },
    { child_id: 3, schedule_id: 1, completed: true },
    { child_id: 3, schedule_id: 3, completed: true },
  ]);
};
