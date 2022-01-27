// const faker = require('faker');

// const profiles = [...new Array(20)].map((i, idx) => ({
//   okta: idx === 0 ? '00ulthapbErVUwVJy4x6' : faker.random.alphaNumeric(20),
//   avatarUrl: faker.image.avatar(),
//   email: idx === 0 ? 'llama001@maildrop.cc"' : faker.internet.email(),
//   name:
//     idx === 0
//       ? 'Test001 User'
//       : `${faker.name.firstName()} ${faker.name.lastName()}`,
//   type: Math.floor(Math.random() * 4 + 1),
// }));

/*
  Manually setting the `id` for each profile to the Okta provided ID. Adding
  profiles was not in scope for this iteration, but adding profiles in the 
  future will require the okta-id to be set as the `id` for each profile.
*/
const profiles = [
  {
    profile_id: 1,
    email: 'Test001@maildrop.cc',
    name: 'Test001 User',
    okta_id: '00ulthapbErVUwVJy4x6',
    role: 1,
  },
  {
    profile_id: 2,
    email: 'Test002@maildrop.cc',
    name: 'Test002 User',
    okta_id: '00ultwew80Onb2vOT4x6',
    role: 2,
  },
  {
    profile_id: 3,
    email: 'Test003@maildrop.cc',
    name: 'Test003 User',
    okta_id: '00ultx74kMUmEW8054x6',
    role: 3,
  },
  {
    profile_id: 4,
    email: 'Test004@maildrop.cc',
    name: 'Test004 User',
    okta_id: '00ultwqjtqt4VCcS24x6',
    role: 4,
  },
  {
    profile_id: 5,
    email: 'Test005@maildrop.cc',
    name: 'Test005 User',
    okta_id: '00ultwz1n9ORpNFc04x6',
    role: 5,
  },
  {
    profile_id: 6,
    email: 'Test006@maildrop.cc',
    name: 'Test006 User',
    okta_id: '00u13omswyZM1xVya4x7',
    role: 1,
  },
  {
    profile_id: 7,
    email: 'Test007@maildrop.cc',
    name: 'Test007 User',
    okta_id: '00u13ol5x1kmKxVJU4x7',
    role: 2,
  },
  {
    profile_id: 8,
    email: 'Test008@maildrop.cc',
    name: 'Test008 User',
    okta_id: '00u13oned0U8XP8Mb4x7',
    role: 3,
  },
];

exports.seed = function (knex) {
  return knex('profiles').insert(profiles);
};
