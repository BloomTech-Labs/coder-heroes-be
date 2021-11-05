exports.seed = function (knex) {
  return knex('parents').insert([
    { user_id: 4 },
    { user_id: 5 },
    { user_id: 6 },
  ]);
};
