var oauth = {
  issuer: 'https://yukon.vivvocloud.com/',
  authorizationURL: 'https://yukon.vivvocloud.com/oauth/v2/authorize',
  tokenURL: 'https://yukon.vivvocloud.com/oauth/v2/token',
  userInfoURL: 'https://yukon.vivvocloud.com/oauth/v2/userinfo',
  //clientID: "8406d129-defd-4e19-8290-17941b14bcc2",
  //clientSecret: "585d435c-a174-4608-9b40-75b11d929293",
  //callbackURL: "http://localhost:3000/oidc/callback",

  clientID: '06829d34-e307-4289-800d-24ff9d438ee8',
  clientSecret: 'fe2aa8ea-aec1-475a-987e-b35659e66a11',
  callbackURL: 'https://yukon-gov-sfap.web.app/oidc/callback',

  scope: 'openid profile email phone address'      
}


const { Provider } = require('oidc-provider');
const configuration = {
  // ... see /docs for available configuration
  clients: [{
    client_id: oauth.clientID,
    client_secret: oauth.clientSecret,
    redirect_uris: [oauth.callbackURL],
    // ... other client properties
  }],
};

const oidc = new Provider(oauth.issuer, configuration);

oidc.listen(3000, () => {
  console.log('oidc-provider listening on port 3000, check http://localhost:3000/.well-known/openid-configuration');
});