const admin = require('firebase-admin');
const functions = require('firebase-functions');
const cors = require('cors')({origin: true}); 
const request = require('request');

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


exports.token = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    var data = req.body.data;
    var code = data.code;

 		var url = `${config.issuer}oauth/v2/token?grant_type=authorization_code&code=${code}&client_id=${config.clientID}&client_secret=${config.clientSecret}&redirect_uri=${encodeURI(config.callbackURL)}`;

    var options = {
		  'method': 'GET',
		  'url': url,
		  'headers': {
		  }
		};
		await request(options, (error, response, body) => {
			console.log({error, response, body})
	    res.status(200).send({ 
	      data: {
	      	statusCode: (response && response.statusCode),
	        token: response.body,
	        url
	      }
	    })
		});

	})
});