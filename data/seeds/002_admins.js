exports.seed = function (knex) {
  return knex('super_admins').insert([{ profile_id: 7 }]);
};
