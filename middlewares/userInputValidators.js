// импорты
const { celebrate, Joi } = require('celebrate');

const {
  joiInvalidEmailMsg,
  joiToBeStringMsg,
  joiRequiredFieldMsg,
  joiCantBeEmptyMsg,
  joiMaxLengthMsg,
  joiMinLengthMsg,
} = require('../config');

/// ///////////////////////////////////////////////////////////////////////////////////

// объект с ключами для валидации инпутов пользователя
const userValKeys = {
  password: Joi.string().required().messages({
    'string.base': joiToBeStringMsg,
    'string.empty': joiCantBeEmptyMsg,
    'any.required': joiRequiredFieldMsg,
  }),
  email: Joi.string().required().email().messages({
    'string.email': joiInvalidEmailMsg,
    'string.empty': joiCantBeEmptyMsg,
    'any.required': joiRequiredFieldMsg,
  }),
  name: Joi.string().required().min(2).max(30)
    .messages({
      'string.base': joiToBeStringMsg,
      'string.empty': joiCantBeEmptyMsg,
      'string.min': joiMinLengthMsg,
      'string.max': joiMaxLengthMsg,
      'any.required': joiRequiredFieldMsg,
    }),
};

/// ///////////////////////////////////////////////////////////////////////////////////

// общий метод валидации
const userValidation = ({ ...args }) => celebrate({
  body: Joi.object().keys(args),
});

/// ///////////////////////////////////////////////////////////////////////////////////

// метод валидации регистрации пользователя
const signupValidation = () => userValidation({
  password: userValKeys.password,
  email: userValKeys.email,
  name: userValKeys.name,
});

/// ///////////////////////////////////////////////////////////////////////////////////

// метод валидации авторизации пользователя
const signinValidation = () => userValidation({
  password: userValKeys.password,
  email: userValKeys.email,
});

/// ///////////////////////////////////////////////////////////////////////////////////

// метод валидации обновления данных пользователя
const userPatchValidation = () => userValidation({
  email: userValKeys.email,
  name: userValKeys.name,
});

/// ///////////////////////////////////////////////////////////////////////////////////

// экспорт
module.exports = { signupValidation, signinValidation, userPatchValidation };
