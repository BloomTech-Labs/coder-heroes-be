exports.seed = function (knex) {
      return knex('children').insert([
        { parent_id: 2, user_id: 5, username: 'ILoveFortnite', age: 12 },
        { parent_id: 5, user_id: 2, username: 'BananaBread', age: 13 },
        { parent_id: 3, user_id: 4, username: 'AwesomeDinosaur', age: 11 },
      ]);
};
