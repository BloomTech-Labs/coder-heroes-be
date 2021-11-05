exports.seed = function (knex) {
  return knex('prereqs').insert([
    { course_id: 2, precourse_id: 1 },
    { course_id: 3, precourse_id: 1 },
    { course_id: 3, precourse_id: 2 },
    { course_id: 4, precourse_id: 3 },
  ]);
};
