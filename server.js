require('dotenv').config();
const app = require('./api/app.js');
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: 'https://a.coderheroes.dev/',
  issuerBaseURL: `https://dev-35n2stap.auth0.com/`,
});

// This route doesn't need authentication
app.get('/api/public', function (req, res) {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this.",
  });
});

// This route needs authentication
app.get('/api/private', checkJwt, function (req, res) {
  res.json({
    message:
      'Hello from a private endpoint! You need to be authenticated to see this.',
  });
});

const checkScopes = requiredScopes('read:messages');

app.get('/api/private-scoped', checkJwt, checkScopes, function (req, res) {
  res.json({
    message:
      'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.',
  });
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
app.timeout = 60 * 10 * 1000;
