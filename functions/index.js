const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();

exports.auth = require('./auth');
//exports.paystubs = require('./paystubs');