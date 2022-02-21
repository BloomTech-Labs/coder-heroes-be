exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('roles').then(function () {
    // Inserts seed entries
    return knex('roles').insert([
      { role_name: 'super_admin' },
      { role_name: 'admin' },
      { role_name: 'instructor' },
      { role_name: 'parent' },
      { role_name: 'child' },
    ]);
  });
};
