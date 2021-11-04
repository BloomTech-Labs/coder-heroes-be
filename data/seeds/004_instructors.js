exports.seed = function (knex) {
  return knex('instructors').insert([
    {
      user_id: 1,
      rating: 2,
      bio: 'I love spaghetti and code, but not the two together.',
      approved: false,
      approved_by: 1,
    },
    {
      user_id: 2,
      rating: 5,
      bio: 'Coding is life.',
      approved: true,
      approved_by: 1,
    },
    {
      user_id: 3,
      rating: 3,
      bio: 'I love making content for people to enjoy!',
      approved: true,
      approved_by: 1,
    },
  ]);
};
