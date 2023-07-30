const joi = require('joi');

const CreateUserValidation = (data) => {
  const schema = joi.object({
    name: joi.string().min(2).max(15).required()
      .messages({
        'string.empty': 'Ім\'я є обов\'язковим',
        'string.min': 'Ім\'я має містити не менше 2 символів',
        'string.max': 'Ім\'я має містити не більше 15 символів',
      }),
    surname: joi.string().min(2).max(15).allow('')
      .messages({
        'string.min': 'Прізвище має містити не менше 2 символів',
        'string.max': 'Прізвище має містити не більше 15 символів',
      }),
    gender: joi.string().valid('man', 'woman').valid('').messages({
      'any.only':
        'Гендер має бути одним із допустимих значень: man, woman, або порожній',
    }),
    phone: joi
      .string()
      .pattern(/^(?:\+?380|\b0)\d{9}$/)
      .required()
      .messages({
        'string.empty': 'Номер телефону є обов\'язковим',
        'string.pattern.base':
          'Номер телефону має відповідати патерну (+38)0xx-xxx-xx-xx)',
      }),
    // password: joi
    //   .string()
    //   .min(6)
    //   .max(72)
    //   .pattern(/^(?=.*[a-zA-Z]).{6,72}$/)
    //   .required()
    //   .messages({
    //     'string.empty': "Пароль є обов'язковим",
    //     'string.min': 'Пароль має містити щонайменше 6 символів',
    //     'string.max': 'Пароль має містити не більше 72 символів',
    //     'string.pattern.base':
    //       'Пароль має містити щонайменше одну літеру латинського алфавіту',
    //   }),
    // repeatPassword: joi
    //   .string()
    //   .valid(joi.ref('password'))
    //   .required()
    //   .messages({
    //     'any.only': 'Паролі не співпадають',
    //   }),
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
      'any.only':
        'Роль має бути одним із допустимих значень: user, moderator, admin',
    }),
    avatar: joi.string().allow('').max(255),
  });
  return schema.validate(data);
};

const UpdateUserValidation = (data) => {
  const schema = joi.object({
    id: joi.string().messages({
      'string.empty': 'ID є обов\'язковим',
    }),
    name: joi.string().min(2).max(15).required()
      .messages({
        'string.empty': 'Ім\'я є обов\'язковим',
        'string.min': 'Ім\'я має містити не менше 2 символів',
        'string.max': 'Ім\'я має містити не більше 15 символів',
      }),
    surname: joi.string().min(2).max(15).allow('')
      .messages({
        'string.min': 'Прізвище має містити не менше 2 символів',
        'string.max': 'Прізвище має містити не більше 15 символів',
      }),
    gender: joi.string().valid('man', 'woman', '').required().messages({
      'any.only':
        'Гендер має бути одним із допустимих значень: man, woman, або порожній',
    }),
    phone: joi
      .string()
      .pattern(/^\+380\d{9}$/)
      .required()
      .messages({
        'string.empty': 'Номер телефону є обов\'язковим',
        'string.pattern.base':
          'Номер телефону має відповідати патерну (+38)0xx-xxx-xx-xx)',
      }),
    password: joi
      .string()
      .min(6)
      .max(72)
      .pattern(/^(?=.*[a-zA-Z]).{6,72}$/)
      .messages({
        'string.empty': 'Пароль є обов\'язковим',
        'string.min': 'Пароль має містити щонайменше 6 символів',
        'string.max': 'Пароль має містити не більше 72 символів',
        'string.pattern.base':
          'Пароль має містити щонайменше одну літеру латинського алфавіту',
      }),
    repeatPassword: joi.string().valid(joi.ref('password')).messages({
      'any.only': 'Паролі не співпадають',
    }),
    email: joi.string().min(5).max(50).allow('')
      .email()
      .messages({
        'string.min': 'Електронна пошта має містити не менше 5 символів',
        'string.max': 'Електронна пошта має містити не більше 50 символів',
        'string.email': 'Електронна пошта має бути коректною',
      }),
    floor: joi.number().min(1).max(9).messages({
      'number.min': 'Поверх не може бути менше за 1',
      'number.max': 'Поверх не може бути більше за 9',
    }),
    room: joi.number().min(1).max(99).messages({
      'number.min': 'Квартира не може бути менше за 1',
      'number.max': 'Квартира не може бути більше за 99',
    }),
    role: joi.string().valid('user', 'moderator', 'admin').allow('').messages({
      'any.only':
        'Роль має бути одним із допустимих значень: user, moderator, admin',
    }),
    avatar: joi.string().allow('').max(255),
  });
  return schema.validate(data);
};

module.exports = [CreateUserValidation, UpdateUserValidation];
