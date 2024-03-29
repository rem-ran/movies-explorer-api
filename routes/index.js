// импорты
const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');

const {
  signupValidation,
  signinValidation,
} = require('../middlewares/userInputValidators');

const {
  userLogin,
  userRegister,
  userSignout,
} = require('../controllers/users');

const NotFoundError = require('../errors/NotFoundError');

const { invalitRouteMsg } = require('../config');

/// ///////////////////////////////////////////////////////////////////////////////////

// рутер авторизации пользователя
router.post(
  '/signin',
  // валидируем поля на этапе ввода
  signinValidation(),
  // подключаем котроллер авторизации
  userLogin,
);

/// ///////////////////////////////////////////////////////////////////////////////////

// рутер создания нового пользователя
router.post(
  '/signup',
  // валидируем поля на этапе ввода
  signupValidation(),
  // подключаем котроллер регистрации
  userRegister,
);

/// ///////////////////////////////////////////////////////////////////////////////////

// рутер авторизации для защиты последующих рутов
router.use(auth);

/// ///////////////////////////////////////////////////////////////////////////////////

// подключаем рутер пользователя
router.use('/users', userRouter);

/// ///////////////////////////////////////////////////////////////////////////////////

// подключаем рутер фильмов
router.use('/movies', movieRouter);

/// ///////////////////////////////////////////////////////////////////////////////////

// подключаем рутер выхода пользователя и удаления токена из куки
router.use('/signout', userSignout);

/// ///////////////////////////////////////////////////////////////////////////////////

// подлючаем обработчик несуществующего рута
router.use((req, res, next) => {
  next(new NotFoundError(invalitRouteMsg));
});

/// ///////////////////////////////////////////////////////////////////////////////////

// экспорт
module.exports = router;
