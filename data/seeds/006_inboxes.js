exports.seed = function (knex) {
  return knex('conversations').insert([
    { profile_id: 1 },
    { profile_id: 2 },
    { profile_id: 3 },
    { profile_id: 4 },
    { profile_id: 5 },
    { profile_id: 6 },
    { profile_id: 7 },
    { profile_id: 8 },
  ]);
};
