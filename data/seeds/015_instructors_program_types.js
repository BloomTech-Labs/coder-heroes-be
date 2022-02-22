exports.seed = function (knex) {
  return knex('instructors_program_types').insert([
    {
      instructor_id: 1,
      program_id: 1,
    },
    {
      instructor_id: 1,
      program_id: 2,
    },
    {
      instructor_id: 2,
      program_id: 3,
    },
  ]);
};
