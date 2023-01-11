const faker = require('faker');

let profiles = [...new Array(20)].map((i, idx) => ({
  auth0_id: idx === 0 ? '00ulthapbErVUwVJy4x6' : faker.random.alphaNumeric(20),
  avatarUrl: faker.image.avatar(),
  email: idx === 0 ? 'llama001@maildrop.cc"' : faker.internet.email(),
  name:
    idx === 0
      ? 'Test001 User'
      : `${faker.name.firstName()} ${faker.name.lastName()}`,
  type: Math.floor(Math.random() * 4 + 1),
}));

/*
  Manually setting the `id` for each profile to the Auth0 provided ID. Adding
  profiles was not in scope for this iteration, but adding profiles in the 
  future will require the auth0-id to be set as the `id` for each profile.
*/

// TO-DO: Implement dummy Auth0 IDs
profiles = [
  {
    email: 'llama001@maildrop.cc',
    name: 'Test001 User',
    role_id: 1,
    pending: false,
  },
  {
    email: 'llama002@maildrop.cc',
    name: 'Test002 User',
    role_id: 2,
    pending: false,
  },
  {
    email: 'llama003@maildrop.cc',
    name: 'Test003 User',
    role_id: 3,
    pending: false,
  },
  {
    email: 'llama004@maildrop.cc',
    name: 'Test004 User',
    role_id: 4,
    pending: false,
  },
  {
    email: 'llama005@maildrop.cc',
    name: 'Test005 User',
    role_id: 5,
    pending: false,
  },
  {
    email: 'llama006@maildrop.cc',
    name: 'Test006 User',
    role_id: 1,
    pending: false,
  },
  {
    email: 'llama007@maildrop.cc',
    name: 'Test007 User',
    role_id: 2,
    pending: false,
  },
  {
    email: 'llama008@maildrop.cc',
    name: 'Test008 User',
    role_id: 3,
    pending: false,
  },
];

exports.seed = function (knex) {
  return knex('profiles').insert(profiles);
};
