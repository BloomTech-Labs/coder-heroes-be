const faker = require('faker');

let profiles = [...new Array(20)].map((i, idx) => ({
  okta_id: idx === 0 ? '00ulthapbErVUwVJy4x6' : faker.random.alphaNumeric(20),
  avatarUrl: faker.image.avatar(),
  email: idx === 0 ? 'llama001@maildrop.cc"' : faker.internet.email(),
  name:
    idx === 0
      ? 'Test001 User'
      : `${faker.name.firstName()} ${faker.name.lastName()}`,
  type: Math.floor(Math.random() * 4 + 1),
}));

/*
  Manually setting the `id` for each profile to the Okta provided ID. Adding
  profiles was not in scope for this iteration, but adding profiles in the 
  future will require the okta-id to be set as the `id` for each profile.
*/
profiles = [
  {
    email: 'llama001@maildrop.cc',
    name: 'Test001 User',
    okta_id: '00ulthapbErVUwVJy4x6',
    role_id: 1,
    pending: false,
  },
  {
    email: 'llama002@maildrop.cc',
    name: 'Test002 User',
    okta_id: '00ultwew80Onb2vOT4x6',
    role_id: 2,
    pending: false,
  },
  {
    email: 'llama003@maildrop.cc',
    name: 'Test003 User',
    okta_id: '00ultx74kMUmEW8054x6',
    role_id: 3,
    pending: false,
  },
  {
    email: 'llama004@maildrop.cc',
    name: 'Test004 User',
    okta_id: '00ultwqjtqt4VCcS24x6',
    role_id: 4,
    pending: false,
  },
  {
    email: 'llama005@maildrop.cc',
    name: 'Test005 User',
    okta_id: '00ultwz1n9ORpNFc04x6',
    role_id: 5,
    pending: false,
  },
  {
    email: 'llama006@maildrop.cc',
    name: 'Test006 User',
    okta_id: '00u13omswyZM1xVya4x7',
    role_id: 1,
    pending: false,
  },
  {
    email: 'llama007@maildrop.cc',
    name: 'Test007 User',
    okta_id: '00u13ol5x1kmKxVJU4x7',
    role_id: 2,
    pending: false,
  },
  {
    email: 'llama008@maildrop.cc',
    name: 'Test008 User',
    okta_id: '00u13oned0U8XP8Mb4x7',
    role_id: 3,
    pending: false,
  },
];

exports.seed = function (knex) {
  return knex('profiles').insert(profiles);
};
