
const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const port = 2121;

var config = {
   oauth: {
      domain: 'dev-0tc6bn14.eu.auth0.com',
      clientID: 'ZGlOd5wvf0bL0USl6jD4QBqX6eiDsitQ',
      clientSecret: 'qwEo6QpvXVgBW8MJ2xXITNF_nluletB-4BrA5rlyWl5VOB9K_taawUe-PEBNJKbH',
      scope: ['openid', 'profile', 'email'],
      logoutRedirectUri: 'http://localhost:3000/oidc/callback',
      redirectUri: 'http://localhost:3000/oidc/callback'    
    }
}


// Authorization middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${config.oauth.domain}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: [`https://api.gov.yk.ca/sfa`, `${config.oauth.domain}.auth0.com`], //https://${config.oauth.domain}.auth0.com/api/v2/`,
  issuer: `https://${config.oauth.domain}/`,
  algorithms: ['RS256']
});


app.get('/api/private', checkJwt, function(req, res) {

  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.',
    user: req.user
  });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})