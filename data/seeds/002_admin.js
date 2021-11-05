exports.seed = function (knex) {
  return knex('admins').insert([
    { user_id: 1 },
    { user_id: 2 },
    { user_id: 3 },
  ]);
};
