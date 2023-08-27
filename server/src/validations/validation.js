function validation(body, schema, next) {
  const { error: customError } = schema(body);
  if (customError) {
    const errorMessages = customError.details.map((detail) => detail.message);
    return errorMessages.join(', ');
  }
}

export default validation;
