// номер порта
const { PORT = 3000 } = process.env;

// адрес базы данных
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

/// ///////////////////////////////////////////////////////////////////////////////////

// проверка валидности url
const regexUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9.]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#'?&//=]*)/;

/// ///////////////////////////////////////////////////////////////////////////////////

// статусы ошибок
const ERROR_CODE_400 = 400;
const ERROR_CODE_401 = 401;
const ERROR_CODE_403 = 403;
const ERROR_CODE_404 = 404;
const ERROR_CODE_409 = 409;
const ERROR_CODE_500 = 500;

// статус сохранения на сервере
const CODE_201 = 201;

/// ///////////////////////////////////////////////////////////////////////////////////

// коснтанты сообщений успешных ответов
const logoutOkMsg = 'Вы успешно вышли';
const filmDeletedMsg = 'Фильм удален.';

/// ///////////////////////////////////////////////////////////////////////////////////

// константы сообщений ошибок
const authErrorMsg = 'Необходима авторизация.';
const invalidEmailMsg = 'Неправильный формат почты';
const serverErrorMsg = 'На сервере произошла ошибка.';
const invalitRouteMsg = 'Запрошен несуществующий роут.';
const validUrlRequiredMsg = 'Введите корректную ссылку';
const wrongEmailOrPassMsg = 'Неправильные почта или пароль';
const notCorrectMovieIdMsg = 'Указан некорректный id фильма.';
const notFoundMovieMsg = 'Фильм по указанному _id не найден.';
const notAllowedToDelMovieMsg = 'Нельзя удалять чужие фильмы.';
const emailRequiredMsg = 'Поле email обязательно к заполнению';
const sameEmailUserMsg = 'Пользователь с таким email уже существует';
const invalidNameMaxLengthMsg = 'Имя должно состоять максимум из 30 символов';
const invalidNameMinLengthMsg = 'Имя должно состоять как минимум из 2 символов';
const rateLimitErrorMsg = 'От вашего IP было совершено слишком много запросов. Попробуйте ещё раз через 15 минут';

/// ///////////////////////////////////////////////////////////////////////////////////

// константы сообщений ошибок joi/celebrate
const joiToBeNumberMsg = 'Поле {#label} должно быть числом';
const joiToBeStringMsg = 'Поле {#label} должно быть строкой';
const joiCantBeEmptyMsg = 'Поле {#label} не может быть пустым';
const joiToBeHexMsg = 'Поле {#label} должно быть шестнадцатеричным';
const joiInvalidUrlMsg = 'Поле {#label} должно быть валидной ссылкой';
const joiRequiredFieldMsg = 'Поле {#label} обязательно для заполнения';
const joiExactLengthMsg = 'Поле {#label} должно быть длиною в 24 символа';
const joiMinLengthMsg = 'Поле {#label} должго быть минимум {#limit} символов';
const joiInvalidEmailMsg = 'Поле {#label} должно быть валидным имеил адресом';
const joiMaxLengthMsg = 'Поле {#label} должго быть максимум {#limit} символов';

/// ///////////////////////////////////////////////////////////////////////////////////

// экспорт
module.exports = {
  invalidNameMinLengthMsg,
  invalidNameMaxLengthMsg,
  notAllowedToDelMovieMsg,
  notCorrectMovieIdMsg,
  validUrlRequiredMsg,
  wrongEmailOrPassMsg,
  joiRequiredFieldMsg,
  joiInvalidEmailMsg,
  joiCantBeEmptyMsg,
  rateLimitErrorMsg,
  joiExactLengthMsg,
  notFoundMovieMsg,
  emailRequiredMsg,
  sameEmailUserMsg,
  joiToBeStringMsg,
  joiToBeNumberMsg,
  joiInvalidUrlMsg,
  joiMinLengthMsg,
  joiMaxLengthMsg,
  invalidEmailMsg,
  invalitRouteMsg,
  filmDeletedMsg,
  serverErrorMsg,
  joiToBeHexMsg,
  authErrorMsg,
  logoutOkMsg,
  ERROR_CODE_400,
  ERROR_CODE_401,
  ERROR_CODE_403,
  ERROR_CODE_404,
  ERROR_CODE_409,
  ERROR_CODE_500,
  DB_ADDRESS,
  regexUrl,
  CODE_201,
  PORT,
};
