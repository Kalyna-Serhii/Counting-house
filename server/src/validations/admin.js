const joi = require('joi');

const FakeUserValidation = (data) => {
  const schema = joi.object({
    name: joi
      .string()
      .min(2)
      .max(15)
      .required()
      .regex(/^[^\d\s]+$/)
      .messages({
        'string.empty': 'Ім\'я є обов\'язковим',
        'string.min': 'Ім\'я має містити не менше 2 символів',
        'string.max': 'Ім\'я має містити не більше 15 символів',
        'string.pattern.base': 'Ім\'я не може містити цифр та пробілів',
      }),
    surname: joi
      .string()
      .min(2)
      .max(15)
      .allow('')
      .regex(/^[^\d\s]+$/)
      .messages({
        'string.min': 'Прізвище має містити не менше 2 символів',
        'string.max': 'Прізвище має містити не більше 15 символів',
        'string.pattern.base': 'Прізвище не може містити цифр та пробілів',
      }),
    gender: joi.string().valid('man', 'woman').valid('').messages({
      'any.only': 'Гендер має бути одним із допустимих значень: man, woman, або порожній',
    }),
    phone: joi
      .string()
      .pattern(/^(?:\+?380|\b0)\d{9}$/)
      .required()
      .messages({
        'string.empty': 'Номер телефону є обов\'язковим',
        'string.pattern.base': 'Номер телефону має відповідати патерну (+38)0xx-xxx-xx-xx)',
      }),
    email: joi.string().min(5).max(50).allow('')
      .email()
      .messages({
        'string.min': 'Електронна пошта має містити не менше 5 символів',
        'string.max': 'Електронна пошта має містити не більше 50 символів',
        'string.email': 'Електронна пошта має бути коректною',
      }),
    floor: joi.number().min(1).max(9).required()
      .messages({
        'number.base': 'Поверх є обов\'язковим',
        'number.empty': 'Поверх є обов\'язковим',
        'number.min': 'Поверх не може бути менше за 1',
        'number.max': 'Поверх не може бути більше за 9',
      }),
    room: joi.number().min(1).max(99).required()
      .messages({
        'number.base': 'Квартира є обов\'язковою',
        'number.empty': 'Квартира є обов\'язковою',
        'number.min': 'Квартира не може бути менше за 1',
        'number.max': 'Квартира не може бути більше за 99',
      }),
    role: joi.string().valid('user', 'moderator', 'admin').allow('').messages({
      'any.only': 'Роль має бути одним із допустимих значень: user, moderator, admin',
    }),
    avatar: joi.string().allow('').max(255),
  });
  const options = {
    abortEarly: false, // Включаем вывод всех ошибок
  };
  return schema.validate(data, options);
};

module.exports = FakeUserValidation;
