const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  // check if cookies empty
  // if empty generate new session using session's method
  // insert session ID into sessions table
  // set cookie in response header with unique hash
  console.log('req', req);
  console.log('sessions', req.sessions);
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

