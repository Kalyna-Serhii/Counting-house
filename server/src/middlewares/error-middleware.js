const ApiError = require('../exceptions/api-error');

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }
  next();
  return res.status(500).json({ message: `Виникла непередбачувана помилка, спробуйте пізніше. ${err.message || err}` });
};

module.exports = errorMiddleware;
