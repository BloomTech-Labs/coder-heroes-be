const faker = require('faker');

const profiles = [...new Array(5)].map((i, idx) => ({
  id: idx === 0 ? '00ulthapbErVUwVJy4x6' : faker.random.alphaNumeric(20),
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
profiles[0].user_id = '00u19v1wwrVU5Ui1j5d7';
profiles[1].user_id = '00u1humq824KiXNFp5d7';
profiles[2].user_id = '00u19v66wqTNTSBw85d7';
profiles[3].user_id = '00ulzenirO3Evj2U95d6';
profiles[4].user_id = '00ulzdb18iCY1wMep5d6';
profiles[5].user_id = '00ulzfj6nX79gu0Nh5d6';

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('profiles')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert(profiles);
    });
};
