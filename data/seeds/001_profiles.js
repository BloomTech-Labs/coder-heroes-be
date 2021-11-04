const faker = require('faker');
exports.seed = function (knex) {
  return knex('profiles').insert([
    {
      okta: 'help',
      name: 'Joann',
      email: 'Joann@aol.com',
      avatarUrl: faker.image.avatar(),
    },
    {
      okta: 'random',
      name: 'Jordan',
      email: 'Jordan@aol.com',
      avatarUrl: faker.image.avatar(),
    },
    {
      okta: 'maybe',
      name: 'Larry',
      email: 'Larry@aol.com',
      avatarUrl: faker.image.avatar(),
    },
  ]);
};
// const profiles = [...new Array(5)].map((i, idx) => ({
//   // key: idx === 0 ? '00ulthapbErVUwVJy4x6' : faker.random.alphaNumeric(20),
//   avatarUrl: faker.image.avatar(),
//   email: idx === 0 ? 'llama001@maildrop.cc"' : faker.internet.email(),
//   name:
//     idx === 0
//       ? 'Test001 User'
//       : `${faker.name.firstName()} ${faker.name.lastName()}`,
// }));

/*
  Manually setting the `id` for each profile to the Okta provided ID. Adding
  profiles was not in scope for this iteration, but adding profiles in the 
  future will require the okta-id to be set as the `id` for each profile.
*/

// exports.seed = function (knex) {
//   return knex('profiles').insert(profiles);
// };
