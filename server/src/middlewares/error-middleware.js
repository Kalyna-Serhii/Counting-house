import ApiError from '../exceptions/api-error';

const errorMiddleware = (err, req, res, next) => {
  // if (err instanceof ApiError) {
  //   console.dir(err.message);
  //   console.dir(err.status);
  //   return res.status(err.status).json({ message: err.message, errors: err.errors });
  // }
  // console.dir(err);
  next();
  return res.status(500).json({ message: `Виникла непередбачувана помилка, спробуйте пізніше. ${err.message || err}` });
};

export default errorMiddleware;
