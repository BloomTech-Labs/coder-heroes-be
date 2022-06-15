exports.seed = function (knex) {
  return knex('student_badges').insert([
    {
      child_id: 1,
      badge_id: 1,
    },
    {
      child_id: 1,
      badge_id: 3,
    },
  ]);
};
