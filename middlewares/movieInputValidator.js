// импорты
const { celebrate, Joi } = require('celebrate');

/// ///////////////////////////////////////////////////////////////////////////////////

// объект с ключами для валидации инпутов фильма
const movieValKeys = {
  country: Joi.string().required().messages({
    'string.base': 'Поле {#label} должно быть строкой',
    'string.empty': 'Поле {#label} не может быть пустым',
    'any.required': 'Поле {#label} обязательно для заполнения',
  }),
  director: Joi.string().required().messages({
    'string.email': 'Поле {#label} должно быть валидным имеил адресом',
    'string.empty': 'Поле {#label} не может быть пустым',
    'any.required': 'Поле {#label} обязательно для заполнения',
  }),
  duration: Joi.number().required().messages({
    'number.base': 'Поле {#label} должно быть числом',
    'number.empty': 'Поле {#label} не может быть пустым',
    'any.required': 'Поле {#label} обязательно для заполнения',
  }),
  year: Joi.string().required().messages({
    'string.base': 'Поле {#label} должно быть строкой',
    'string.empty': 'Поле {#label} не может быть пустым',
    'any.required': 'Поле {#label} обязательно для заполнения',
  }),
  description: Joi.string().required().messages({
    'string.base': 'Поле {#label} должно быть строкой',
    'string.empty': 'Поле {#label} не может быть пустым',
    'any.required': 'Поле {#label} обязательно для заполнения',
  }),
  image: Joi.string().required().uri().messages({
    'string.base': 'Поле {#label} должно быть строкой',
    'string.empty': 'Поле {#label} не может быть пустым',
    'any.required': 'Поле {#label} обязательно для заполнения',
    'string.uri': 'Поле {#label} должно быть валидной ссылкой',
  }),
  trailerLink: Joi.string().required().uri().messages({
    'string.base': 'Поле {#label} должно быть строкой',
    'string.empty': 'Поле {#label} не может быть пустым',
    'any.required': 'Поле {#label} обязательно для заполнения',
    'string.uri': 'Поле {#label} должно быть валидной ссылкой',
  }),
  thumbnail: Joi.string().required().uri().messages({
    'string.base': 'Поле {#label} должно быть строкой',
    'string.empty': 'Поле {#label} не может быть пустым',
    'any.required': 'Поле {#label} обязательно для заполнения',
    'string.uri': 'Поле {#label} должно быть валидной ссылкой',
  }),
  movieId: Joi.number().required().messages({
    'number.base': 'Поле {#label} должно быть числом',
    'any.required': 'Поле {#label} обязательно для заполнения',
  }),
  nameRU: Joi.string().required().messages({
    'string.base': 'Поле {#label} должно быть строкой',
    'string.empty': 'Поле {#label} не может быть пустым',
    'any.required': 'Поле {#label} обязательно для заполнения',
  }),
  nameEN: Joi.string().required().messages({
    'string.base': 'Поле {#label} должно быть строкой',
    'string.empty': 'Поле {#label} не может быть пустым',
    'any.required': 'Поле {#label} обязательно для заполнения',
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
        'string.length': 'Поле {#label} должно быть длиною в 24 символа',
        'string.empty': 'Поле {#label} не может быть пустым',
        'any.required': 'Поле {#label} обязательно для заполнения',
        'string.hex': 'Поле {#label} должно быть шестнадцатеричным',
      }),
  }),
});

/// ///////////////////////////////////////////////////////////////////////////////////

// экспорт
module.exports = { movieCreateValidation, movieDeleteValidation };
