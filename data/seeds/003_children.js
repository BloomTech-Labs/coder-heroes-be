exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('table_name')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        { parent_id: 2, user_id: 5, username: 'FidgetSpinnersRLyfe', age: 12 },
        { parent_id: 5, user_id: 20, username: 'FortniteGamerBoy', age: 13 },
        { parent_id: 3, user_id: 34, username: 'VapeGod360XXX', age: 11 },
      ]);
    });
};
