// импорты
const { celebrate, Joi } = require('celebrate');

const {
  joiToBeStringMsg,
  joiRequiredFieldMsg,
  joiCantBeEmptyMsg,
  joiToBeNumberMsg,
  joiInvalidUrlMsg,
  joiExactLengthMsg,
  joiToBeHexMsg,
} = require('../config');

/// ///////////////////////////////////////////////////////////////////////////////////

// объект с ключами для валидации инпутов фильма
const movieValKeys = {
  country: Joi.string().required().messages({
    'string.base': joiToBeStringMsg,
    'string.empty': joiCantBeEmptyMsg,
    'any.required': joiRequiredFieldMsg,
  }),
  director: Joi.string().required().messages({
    'string.email': joiToBeStringMsg,
    'string.empty': joiCantBeEmptyMsg,
    'any.required': joiRequiredFieldMsg,
  }),
  duration: Joi.number().required().messages({
    'number.base': joiToBeNumberMsg,
    'number.empty': joiCantBeEmptyMsg,
    'any.required': joiRequiredFieldMsg,
  }),
  year: Joi.string().required().messages({
    'string.base': joiToBeStringMsg,
    'string.empty': joiCantBeEmptyMsg,
    'any.required': joiRequiredFieldMsg,
  }),
  description: Joi.string().required().messages({
    'string.base': joiToBeStringMsg,
    'string.empty': joiCantBeEmptyMsg,
    'any.required': joiRequiredFieldMsg,
  }),
  image: Joi.string().required().uri().messages({
    'string.base': joiToBeStringMsg,
    'string.empty': joiCantBeEmptyMsg,
    'any.required': joiRequiredFieldMsg,
    'string.uri': joiInvalidUrlMsg,
  }),
  trailerLink: Joi.string().required().uri().messages({
    'string.base': joiToBeStringMsg,
    'string.empty': joiCantBeEmptyMsg,
    'any.required': joiRequiredFieldMsg,
    'string.uri': joiInvalidUrlMsg,
  }),
  thumbnail: Joi.string().required().uri().messages({
    'string.base': joiToBeStringMsg,
    'string.empty': joiCantBeEmptyMsg,
    'any.required': joiRequiredFieldMsg,
    'string.uri': joiInvalidUrlMsg,
  }),
  movieId: Joi.number().required().messages({
    'number.base': joiToBeNumberMsg,
    'number.empty': joiCantBeEmptyMsg,
    'any.required': joiRequiredFieldMsg,
  }),
  nameRU: Joi.string().required().messages({
    'string.base': joiToBeStringMsg,
    'string.empty': joiCantBeEmptyMsg,
    'any.required': joiRequiredFieldMsg,
  }),
  nameEN: Joi.string().required().messages({
    'string.base': joiToBeStringMsg,
    'string.empty': joiCantBeEmptyMsg,
    'any.required': joiRequiredFieldMsg,
  }),
};

/// ///////////////////////////////////////////////////////////////////////////////////

// общий метод валидации
const movieValidation = ({ ...args }) => celebrate({
  body: Joi.object().keys(args),
});

/// ///////////////////////////////////////////////////////////////////////////////////

// метод валидации регистрации пользователя
const movieCreateValidation = () => movieValidation({
  country: movieValKeys.country,
  director: movieValKeys.director,
  duration: movieValKeys.duration,
  year: movieValKeys.year,
  description: movieValKeys.description,
  image: movieValKeys.image,
  trailerLink: movieValKeys.trailerLink,
  thumbnail: movieValKeys.thumbnail,
  movieId: movieValKeys.movieId,
  nameRU: movieValKeys.nameRU,
  nameEN: movieValKeys.nameEN,
});

/// ///////////////////////////////////////////////////////////////////////////////////

const movieDeleteValidation = () => celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24)
      .messages({
        'string.length': joiExactLengthMsg,
        'string.empty': joiCantBeEmptyMsg,
        'any.required': joiRequiredFieldMsg,
        'string.hex': joiToBeHexMsg,
      }),
  }),
});

/// ///////////////////////////////////////////////////////////////////////////////////

// экспорт
module.exports = { movieCreateValidation, movieDeleteValidation };
