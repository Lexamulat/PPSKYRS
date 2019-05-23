const wrapError = require('../domain/error/wrapError');

module.exports = function () {
  return function errorHandler(err, req, res, next) {

    const {code, message, details} = wrapError(err);

    if (err.status === 404) {
      res.status(404);
      res.send(err);
      return next();
    }


    res.send({
      status: 'error',
      code,
      message,
      details
    });
    next();
  }
};
