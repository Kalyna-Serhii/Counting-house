const joi = require('joi');

const userValidation = (data) => {
  const schema = joi.object({
    id: joi.number().min(1).messages({
      'number.empty': "ID є обов'язковим",
      'number.min': 'ID не може бути менше за 1',
    }),
    name: joi.string().min(2).max(15).required().messages({
      'string.empty': "Ім'я є обов'язковим",
      'string.min': "Ім'я має містити не менше 2 символів",
      'string.max': "Ім'я має містити не більше 15 символів",
    }),
    surname: joi.string().min(2).max(15).allow('').messages({
      'string.min': 'Прізвище має містити не менше 2 символів',
      'string.max': 'Прізвище має містити не більше 15 символів',
    }),
    gender: joi.string().valid('man', 'woman').required().messages({
      'string.empty': "Гендер є обов'язковим",
      'any.only': 'Гендер має бути одним із допустимих значень: man, woman',
    }),
    phone: joi
      .string()
      .pattern(/^0\d{9}$/)
      .required()
      .messages({
        'string.empty': "Номер телефону є обов'язковим",
        'string.pattern.base':
          'Номер телефону має відповідати патерну 0xx-xxx-xx-xx (без коду країни та інших символів))',
      }),
    password: joi
      .string()
      .min(8)
      .max(255)
      .pattern(/^(?=.*[a-zA-Z])[ -~]{8,255}$/)
      .required()
      .messages({
        'string.empty': "Пароль є обов'язковим",
        'string.min': 'Пароль має містити щонайменше 8 символів',
        'string.max': 'Пароль має містити не більше 255 символів',
        'string.pattern.base':
          'Пароль має містити щонайменше одну літеру латинського алфавіту',
      }),
    repeatPassword: joi
      .string()
      .min(8)
      .max(255)
      .pattern(/^(?=.*[a-zA-Z])[ -~]{8,255}$/)
      .required()
      .messages({
        'string.empty': "Пароль є обов'язковим",
        'string.min': 'Пароль має містити щонайменше 8 символів',
        'string.max': 'Пароль має містити не більше 255 символів',
        'string.pattern.base':
          'Пароль має містити щонайменше одну літеру латинського алфавіту',
      }),
    email: joi.string().min(5).max(50).allow('').email().messages({
      'string.min': 'Електронна пошта має містити не менше 5 символів',
      'string.max': 'Електронна пошта має містити не більше 50 символів',
      'string.email': 'Електронна пошта має бути коректною',
    }),
    floor: joi.number().min(1).max(9).required().messages({
      'number.empty': "Поверх є обов'язковим",
      'number.min': 'Поверх не може бути менше за 1',
      'number.max': 'Поверх не може бути більше за 9',
    }),
    room: joi.number().min(1).max(98).required().messages({
      'number.empty': "Квартира є обов'язковою",
      'number.min': 'Квартира не може бути менше за 1',
      'number.max': 'Квартира не може бути більше за 98',
    }),
    role: joi.string().valid('osbb', 'admin').allow('').messages({
      'any.only': 'Роль має бути одним із допустимих значень: osbb, admin',
    }),
    avatar: joi.string().allow('').max(255),
  });
  return schema.validate(data);
};

module.exports = userValidation;
