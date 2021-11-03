exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('table_name')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {
          first_name: 'David',
          middle_initial: 'W',
          last_name: 'Crosland',
          county: 'Baltimore',
          image_url: faker.image.avatar(),
        },
        {
          first_name: 'Patricia',
          middle_initial: 'A',
          last_name: 'Cole',
          county: 'Virginia Falls',
          image_url: faker.image.avatar(),
        },
        {
          first_name: 'Neil',
          middle_initial: 'P',
          last_name: 'Miller',
          county: 'Virginia Falls',
          image_url: faker.image.avatar(),
        },
      ]);
    });
};
