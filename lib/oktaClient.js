const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: `${process.env.ORG_URL}`,
  token: `${process.env.API_TOKEN}`,
});

module.exports = client;
