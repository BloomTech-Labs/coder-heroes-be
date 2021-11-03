exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('courses')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('courses').insert([
        {
          size: 5,
          description: 'lorem ipsup',
          subject: 'CS191',
          prereq: '0',
        },
        {
          size: 5,
          descri8tion: 'lorem ipsup',
          subject: 'lorem ipsum',
          prereq: '0',
        },
        {
          size: 5,
          descri1ption: 'lorem ipsup',
          subject: 'lorem ipsum',
          prereq: '0',
        },
      ]);
    });
};
