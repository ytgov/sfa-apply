//const admin = require('firebase-admin');
//const functions = require('firebase-functions');

const { Issuer } = require('openid-client');
const { generators } = require('openid-client');
const code_verifier = generators.codeVerifier();
const code_challenge = generators.codeChallenge(code_verifier);
// store the code_verifier in your framework's session mechanism, if it is a cookie based solution
// it should be httpOnly (not readable by javascript) and encrypted.


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

/*
curl --location -g --request GET 'https://yukon.vivvocloud.com/oauth/v2/authorize?client_id=06829d34-e307-4289-800d-24ff9d438ee8&redirect_uri=http://localhost:3000/oidc/callback&response_type=code&scope=openid&state=ewgergerg'


https://yukon.vivvocloud.com/oauth/v2/authorize?client_id=06829d34-e307-4289-800d-24ff9d438ee8&redirect_uri=http://localhost:3000/oidc/callback&response_type=code&scope=openid&state=ewgergerg

https://yukon.vivvocloud.com/oauth/v2/authorize?client_id=06829d34-e307-4289-800d-24ff9d438ee8&redirect_uri=https://yukon-gov-sfap.web.app/oidc/callback/&response_type=code&scope=openid&state=vjcai
*/

Issuer.discover(oauth.issuer).then((issuer) => {
  console.log('Discovered issuer %s %O', issuer.issuer, issuer.metadata);

  const client = new issuer.Client({
    client_id: oauth.clientID,
    client_secret: oauth.clientSecret,
    redirect_uris: [oauth.callbackURL],
    response_types: ['code'], // code,'client_credentials'
    // id_token_signed_response_alg (default "RS256")
    // token_endpoint_auth_method (default "client_secret_basic")
  }); // => Client

  var url = client.authorizationUrl({
    scope: oauth.scope,
    resource: oauth.callbackURL,
    code_challenge,
    code_challenge_method: 'S256',
  });

  console.log(url);
});



/*
exports.login_url = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    const code_challenge = generators.codeChallenge(code_verifier);

    var url = client.authorizationUrl({
      scope: oauth.scope,
      resource: 'https://my.api.example.com/resource/32178',
      code_challenge,
      code_challenge_method: 'S256',
    });

    response.status(200).send({ 
      data: {
        url
      }
    })

  })
});

exports.callback = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    const params = client.callbackParams(request);
    client.callback('https://client.example.com/callback', params, { code_verifier }).then((tokenSet) => {
      console.log('received and validated tokens %j', tokenSet);
      console.log('validated ID Token claims %j', tokenSet.claims());
    });
  })
});





import FirebaseStrategy = require('passport-firebase-auth').Strategy;


firebase.initializeApp({
 serviceAccount: "path/to/serviceAccountCredentials.json",
 databaseURL: "https://databaseName.firebaseio.com"
});


var FirebaseStrategy = require('passport-firebase-auth').Strategy;

passport.use(new FirebaseStrategy({
    firebaseProjectId: "project-id",
    authorizationURL: 'https://account.example.net/auth',
    callbackURL: 'https://www.example.net/auth/firebase/callback'
},
    function(accessToken, refreshToken, decodedToken, cb) {
        User.findOrCreate(..., function (err, user) {
          return cb(err, user);
        });
    }
));

passport.use(new FirebaseStrategy({
    firebaseProjectId: "project-id",
    authorizationURL: 'https://account.example.net/auth',
    callbackURL: 'https://www.example.net/auth/firebase/callback'
  },
  function(accessToken, refreshToken, decodedToken, cb) {
    User.findOrCreate(..., function (err, user) {
      return cb(err, user);
    });
  }
));



exports.isAuthenticated = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    var data = request.body.data
  })
}

exports.login = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    passport.authenticate('oidc')
    //var data = request.body.data
  })
}


exports.callback = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    passport.authenticate('oidc', { failureRedirect: '/api/error' }),
  })
}











import { Express, NextFunction, Request, Response } from "express"
import * as ExpressSession from "express-session";
import { AuthUser } from "../models/auth";
import { AUTH_REDIRECT, VIVVO_CONFIG } from "../config";

var OidcStrategy = require('passport-openidconnect').Strategy
var passport = require('passport')

export function ensureLoggedIn(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/api/auth/login');
}


export function configureAuthentication(app: Express) {
    app.use(ExpressSession.default({
        secret: 'supersecret',
        resave: true,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user: any, next: any) => {
        var authUser = AuthUser.fromPassport(user);
        next(null, authUser)
    });

    passport.deserializeUser((obj: any, next: any) => {
        next(null, obj)
    });

    passport.use('oidc', new OidcStrategy(VIVVO_CONFIG,
        (issuer: any, sub: any, profile: any, accessToken: any, refreshToken: any, done: any) => {
            return done(null, profile)
        }));

    app.use('/api/auth/login', passport.authenticate('oidc'));

    app.get('/api/auth/logout', (req: any, res) => {
        req.logout();
        req.session.destroy();
        res.status(202).send();
    });

    app.use('/profile', ensureLoggedIn, (req, res) => {
        res.send(req.user);
    }); 

    app.use("/api/auth/isAuthenticated", (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            return res.send(req.user);
        }

        return res.status(401).send();
    });

    app.use('/authorization-code/callback',
        passport.authenticate('oidc', { failureRedirect: '/api/error' }),
        (req, res) => {
            res.redirect(AUTH_REDIRECT);
        }
    );

    app.use("/api/error", (req: Request, res: Response) => {
        console.log(req)
        res.status(500).send("Authentication error");
    })
}
*/