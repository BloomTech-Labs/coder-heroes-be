exports.seed = function (knex) {
  return knex('children').insert([
    { parent_id: 1, user_id: 10, username: 'ILoveFortnite', age: 8 },
    { parent_id: 1, user_id: 11, username: 'BananaBread', age: 12 },
    { parent_id: 2, user_id: 12, username: 'AwesomeDinosaur', age: 11 },
  ]);
};
