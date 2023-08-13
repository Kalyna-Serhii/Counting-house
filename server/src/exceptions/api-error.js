class ApiError extends Error {
  status;

  constructor(status, message) {
    super(message);
    this.status = status;
  }

  static BadRequest(message) {
    return new ApiError(400, message);
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Користувач не авторизований');
  }
}

module.exports = ApiError;
