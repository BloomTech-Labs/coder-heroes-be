exports.seed = function (knex) {
  return knex('inboxes').insert([
    { user_id: 1 },
    { user_id: 2 },
    { user_id: 3 },
  ]);
};
