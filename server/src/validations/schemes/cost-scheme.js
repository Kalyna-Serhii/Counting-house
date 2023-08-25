import joi from 'joi';

const CostSchemeValidation = (data) => {
  const schema = joi.object({
    title: joi.string().min(2).max(255).required()
      .messages({
        'any.required': 'Назва є обов\'язковою',
        'string.empty': 'Назва є обов\'язковою',
        'string.min': 'Назва має містити не менше 2 символів',
        'string.max': 'Назва має містити не більше 255 символів',
      }),
    comment: joi.string(),
    date: joi.date().iso().required().messages({
      'any.required': 'Дата є обов\'язковою',
      'string.empty': 'Дата є обов\'язковою',
    }),
    sum: joi.number().required().messages({
      'any.required': 'Сума є обов\'язковою',
      'string.empty': 'Сума є обов\'язковою',
    }),
    category: joi.string().required().messages({
      'any.required': 'Категорія є обов\'язковою',
      'string.empty': 'Категорія є обов\'язковою',
    }),
  });
  const options = {
    abortEarly: false, // Включаем вывод всех ошибок
  };
  return schema.validate(data, options);
};

export default CostSchemeValidation;
