const ApiError = require('../exceptions/api-error');

function validation(body, schema, next) {
  const { error: customError } = schema(body);
  if (customError) {
    const errorMessages = customError.details.map((detail) => detail.message);
    const errorMessage = errorMessages.join(', ');
    throw next(ApiError.BadRequest(errorMessage));
  }
}

module.exports = validation;
