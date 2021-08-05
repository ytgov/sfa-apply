var request = require('request');

const CONFIG = {
	development: {
    issuer: 'https://yukon.vivvocloud.com/',
    authorizationURL: 'https://yukon.vivvocloud.com/oauth/v2/authorize',
    tokenURL: 'https://yukon.vivvocloud.com/oauth/v2/token',
    userInfoURL: 'https://yukon.vivvocloud.com/oauth/v2/userinfo',
    clientID: '06829d34-e307-4289-800d-24ff9d438ee8',
    clientSecret: 'fe2aa8ea-aec1-475a-987e-b35659e66a11',
    callbackURL: "http://localhost:3000/oidc/callback",
    scope: 'openid profile email phone address'      
  },
  staging: {
    issuer: 'https://yukon.vivvocloud.com/',
    authorizationURL: 'https://yukon.vivvocloud.com/oauth/v2/authorize',
    tokenURL: 'https://yukon.vivvocloud.com/oauth/v2/token',
    userInfoURL: 'https://yukon.vivvocloud.com/oauth/v2/userinfo',
    clientID: "8406d129-defd-4e19-8290-17941b14bcc2",
    clientSecret: '585d435c-a174-4608-9b40-75b11d929293',
    callbackURL: 'https://yukon-gov-sfap.web.app/oidc/callback',
    scope: 'openid profile email phone address' 
  }
}

const config = CONFIG['development']

var code = 'DsiD7hUiRrFXu90JrDMML-NDcOH694NNemO2-mG57q4.VrdUFWk1FFwQcd3l_Il_XUKh9qcYCvPLiGDLSYGo3Zc'

var url = `${config.issuer}oauth/v2/token?grant_type=authorization_code&code=${code}&client_id=${config.clientID}&client_secret=${config.clientSecret}&redirect_uri=${encodeURI(config.callbackURL)}`;

console.log(url)
var options = {
  'method': 'GET',
  'url': url,
  'headers': {
  }
};
request(options, (error, response, body) => {
	console.log('error:', error); 
  console.log('statusCode:', response && response.statusCode); 
  console.log(response.toJSON());
});

