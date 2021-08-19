const admin = require('firebase-admin');
const functions = require('firebase-functions');
const cors = require('cors')({origin: '*'}); 
const request = require('request');

const CONFIG = {
	development: {
		domain: 'dev-0tc6bn14.eu.auth0.com',
    clientID: 'ZGlOd5wvf0bL0USl6jD4QBqX6eiDsitQ',
    clientSecret: 'qwEo6QpvXVgBW8MJ2xXITNF_nluletB-4BrA5rlyWl5VOB9K_taawUe-PEBNJKbH',
    scope: ['openid', 'profile', 'email'],
    logoutRedirectUri: 'http://localhost:3000',
    redirectUri: 'http://localhost:3000/oidc/callback'       
  },
  staging: {
    domain: 'dev-0tc6bn14.eu.auth0.com',
    clientID: 'ZGlOd5wvf0bL0USl6jD4QBqX6eiDsitQ',
    clientSecret: 'qwEo6QpvXVgBW8MJ2xXITNF_nluletB-4BrA5rlyWl5VOB9K_taawUe-PEBNJKbH',
    scope: ['openid', 'profile', 'email'],
    logoutRedirectUri: 'https://yukon-gov-sfap.web.app/',
    redirectUri: 'https://yukon-gov-sfap.web.app/oidc/callback'
  }
}

const config = CONFIG[process.env.ENV||'development']


exports.token = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    var data = req.body.data;
    var code = data.code;
    var state = data.state;

 		var url = `https://${config.domain}/oauth/token?grant_type=authorization_code&code=${encodeURI(code)}&client_id=${config.clientID}&client_secret=${config.clientSecret}&redirect_uri=${encodeURI(config.redirectUri)}&state=${state}`;

    var options = {
		  'method': 'GET',
		  'url': url,
		  'headers': {
		  	'Access-Control-Allow-Methods': 'GET',
		  	'Access-Control-Allow-Origin': '*',
		  	'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
		  }
		};
		await request(options, (error, response, body) => {
			console.log(JSON.stringify({error, response: response.toJSON(), body}))
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