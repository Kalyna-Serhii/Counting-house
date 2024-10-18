function validation(body, schema, next) {
  const { error: customError } = schema(body);
  if (customError) {
    const errorMessages = customError.details.map((detail) => detail.message);
    return errorMessages.join(', ');
  }
}

function isValidUkrainianPhone(phone) {
  const regex = /^380\d{9}$/;
  return regex.test(phone);
}

function isEmail(input) {
  return input.includes('@');
}

export {
  validation,
  isValidUkrainianPhone,
  isEmail
};
