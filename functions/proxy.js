const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

// Create Express Server
const app = express();

// Configuration
//const PORT = 8888;
//const HOST = "localhost";
const API_SERVICE_URL = "https://api.gov.yk.ca";
const api_key = '5f54808b899041e4ab7fd32667ce573e';


// Logging
app.use(morgan('dev'));

app.options('*', cors());
app.use(cors({
  origin:true,
  credentials: true
}));


// Authorization
/*
app.use('', (req, res, next) => {
  if (req.headers) {
    if ([req.headers['x-api-key'], req.headers['X-Api-Key'], req.headers['X-API-Key']].includes('86823ecf-e64f-42d2-8ea7-a0984299328c')) {
      next();
    } else {
      res.sendStatus(403)
    }
  }
});
*/

// Info GET endpoint
app.get('/info', (req, res, next) => {
   res.send('This is a proxy service which proxies to the Yukon API.');
});


// Proxy endpoints
app.use('/sfa', createProxyMiddleware({
   target: API_SERVICE_URL,
   changeOrigin: true, // needed for virtual hosted sites
   ws: true, // proxy websockets
   secure: false,
   pathRewrite: {
      [`^/sfa`]: '/sfa',
   },
   onProxyReq(proxyReq, req, res) {
     proxyReq.setHeader('Ocp-Apim-Subscription-Key', api_key);
   }
}));


//define google cloud function name
exports.sfa = functions.https.onRequest(app);