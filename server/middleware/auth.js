const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  var testCondition = req.cookies;
  if (!testCondition) {
    models.Sessions.create()
      .then((results) => {
        req.session = {};
        req.session.hash = '';
        models.Sessions.get({'id': results.insertId}
        )
          .then(record => {
            req.session.hash = record.hash;
            res.cookie('shortlyid', record.hash);
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
          models.Sessions.create()
            .then((results) => {
              req.session = {};
              req.session.hash = '';
              models.Sessions.get({'id': results.insertId}
              )
                .then(record => {
                  req.session.hash = record.hash;
                  res.cookie('shortlyid', record.hash);
                  next();
                })
                .catch();
            })
            .catch();
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


