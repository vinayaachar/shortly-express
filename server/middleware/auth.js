const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  // var testing = function(req1, res1, next1, cb) {

  // };

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
            req.session.hash = record.hash;
            res.cookies = {
              'shortlyid' : {'value' : record.hash}
            };
            next();
          })
          .catch();

      })
      .catch();
  } else {
    req.session = {};
    req.session.hash = req.cookies.shortlyid;
    models.Sessions.get({'hash': req.session.hash})
      .then(record => {
        if (record === undefined) {
          console.log('malicious cookies');
        } else {
          let sessionId = record.id;
          let userId = record.userId;
          models.Users.get({'id': userId})
            .then(userRecord => {
              if (userRecord === undefined) {
                next();
              } else {
                let userUserName = userRecord.username;
                req.session.userId = userId;
                req.session.user = {};
                req.session.user.username = userUserName;
                next();
              }
            })
            .catch();
        }
      })
      .catch();

  }
};


/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/


