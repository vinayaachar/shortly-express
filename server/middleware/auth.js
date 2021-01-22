const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  // check if cookies empty
  // if empty generate new session using session's method
  // insert session ID into sessions table
  // set cookie in response header with unique hash


  //return new Promise((resolve, reject))
  if (Object.keys(req.cookies).length === 0) {
    models.Sessions.create()
      .then((results) => {
        //console.log(results);
        req.session = {};
        req.session.hash = '';
        // next();
        models.Sessions.get({'id': results.insertId}
        )
          .then(record => {
            res.cookies = {
              'shortlyid' : {'value' : record.hash}
            };
            next();
          })
          .catch();

      })
      .catch();
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

