exports.seed = function (knex) {
  return knex('instructors').insert([
    {
      user_id: 7,
      rating: 2,
      bio: 'I love spaghetti and code, but not the two together.',
    },
    {
      user_id: 8,
      rating: 5,
      bio: 'Coding is life.',
    },
    {
      user_id: 9,
      rating: 3,
      bio: 'I love making content for people to enjoy!',
    },
  ]);
};
