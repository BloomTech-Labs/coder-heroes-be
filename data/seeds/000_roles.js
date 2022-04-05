exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('roles').then(function () {
    // Inserts seed entries
    return knex('roles').insert([
      { role_name: 'super_admin' }, // role_id: 1
      { role_name: 'admin' }, // role_id: 2
      { role_name: 'instructor' }, // role_id: 3
      { role_name: 'parent' }, // role_id: 4
      { role_name: 'child' }, // role_id: 5
    ]);
  });
};
