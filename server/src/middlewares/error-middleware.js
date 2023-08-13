const ApiError = require('../exceptions/api-error');

// eslint-disable-next-line consistent-return,func-names
module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: `Виникла непередбачувана помилка, спробуйте пізніше. ${err.message || err}` });
};
