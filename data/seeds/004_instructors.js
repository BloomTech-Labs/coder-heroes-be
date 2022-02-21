exports.seed = function (knex) {
  return knex('instructors').insert([
    {
      profile_id: 3,
      rating: 2,
      bio: 'I love spaghetti and code, but not the two together.',
      status: false,
      approved_by: 1,
    },
    {
      profile_id: 8,
      rating: 5,
      bio: 'Coding is life.',
      status: true,
      approved_by: 1,
    },
  ]);
};
