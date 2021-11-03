exports.seed = function (knex) {
      return knex('parents').insert([
        {
          user_id: 1,
        },
        {
          user_id: 2,
        },
        {
          user_id: 3,
        },
      ]);
};
