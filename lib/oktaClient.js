const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-625244.okta.com',
  token: '{yourApiToken}',
});

module.exports = client;
