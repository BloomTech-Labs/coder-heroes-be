exports.seed = function (knex) {
  return knex('parents').insert([{ profile_id: 4 }, { user_id: 9 }]);
};
