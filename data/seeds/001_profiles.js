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
  email: 'Test001@maildrop.cc',
  name: 'Test001 User',
  okta_id: '00ulthapbErVUwVJy4x1',
  roles: 'super_admin',
  },
  {
    email: 'Test002@maildrop.cc',
    name: 'Test002 User',
    okta_id: '00ulthapbErVUwVJy4x2',
    roles: 'admin',
  },
  {
    email: 'Test003@maildrop.cc',
    name: 'Test003 User',
    okta_id: '00ulthapbErVUwVJy4x3',
    roles: 'instructor',
  },
  {
    email: 'Test004@maildrop.cc',
    name: 'Test004 User',
    okta_id: '00ulthapbErVUwVJy4x4',
    roles: 'parent',
  },
  {
    email: 'Test005@maildrop.cc',
    name: 'Test005 User',
    okta_id: '00ulthapbErVUwVJy4x5',
    roles: 'child',
  },
   {
  email: 'Test006@maildrop.cc',
  name: 'Test006 User',
  okta_id: '00ulthapbErVUwVJy4x6',
  roles: 'super_admin',
  },
  {
    email: 'Test007@maildrop.cc',
    name: 'Test007 User',
    okta_id: '00ulthapbErVUwVJy4x7',
    roles: 'admin',
  },
  {
    email: 'Test008@maildrop.cc',
    name: 'Test008 User',
    okta_id: '00ulthapbErVUwVJy4x8',
    roles: 'parent',
  },
    {
    email: 'Test009@maildrop.cc',
    name: 'Test009 User',
    okta_id: '00ulthapbErVUwVJy4x9',
    roles: 'child',
  },
]

exports.seed = function (knex) {
  return knex('profiles').insert(profiles);
};
