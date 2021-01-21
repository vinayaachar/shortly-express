const parseCookies = (req, res, next) => {
  var cookiesObj = req.cookies;
  var cookieString = req.headers.cookie;

  if (cookieString) {
    var arrayOfCookies = cookieString.split(';');
    arrayOfCookies.forEach(item => {
      var arrayOfValuePairs = item.split('=');
      arrayOfValuePairs[0] = arrayOfValuePairs[0].trim();
      cookiesObj[arrayOfValuePairs[0]] = arrayOfValuePairs[1];

    });
  }
  req.cookies = cookiesObj;
  next();
};

module.exports = parseCookies;