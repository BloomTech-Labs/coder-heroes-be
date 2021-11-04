const faker = require('faker');

const profiles = [...new Array(20)].map((i, idx) => ({
  avatarUrl: faker.image.avatar(),
  email: idx === 0 ? 'llama001@maildrop.cc"' : faker.internet.email(),
  name:
    idx === 0
      ? 'Test001 User'
      : `${faker.name.firstName()} ${faker.name.lastName()}`,
}));

/*
  Manually setting the `id` for each profile to the Okta provided ID. Adding
  profiles was not in scope for this iteration, but adding profiles in the 
  future will require the okta-id to be set as the `id` for each profile.
*/

exports.seed = function (knex) {
  return knex('profiles').insert(profiles);
};
