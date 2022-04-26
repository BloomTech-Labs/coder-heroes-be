const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-625244.okta.com',
  token: '00mFjWnzDV547YbYF7e_tG8NQu_CX-b3z5KkZUbI4i',
});

module.exports = client;
