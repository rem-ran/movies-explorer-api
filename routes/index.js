//импорты
const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');

const {
  userLogin,
  userRegister,
  userSignout,
} = require('../controllers/users');

const NotFoundError = require('../errors/NotFoundError');

//////////////////////////////////////////////////////////////////////////////////////

//рутер авторизации пользователя
router.post(
  '/signin',
  //валидируем поля на этапе ввода
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  userLogin
);

//////////////////////////////////////////////////////////////////////////////////////

//рутер создания нового пользователя
router.post(
  '/signup',
  //валидируем поля на этапе ввода
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  userRegister
);

//////////////////////////////////////////////////////////////////////////////////////

//рутер авторизации для защиты последующих рутов
router.use(auth);

//////////////////////////////////////////////////////////////////////////////////////

//подключаем рутер пользователя
router.use('/users', userRouter);

//////////////////////////////////////////////////////////////////////////////////////

//подключаем рутер фильмов
router.use('/movies', movieRouter);

//////////////////////////////////////////////////////////////////////////////////////

//подключаем рутер выхода пользователя и удаления токена из куки
router.use('/signout', userSignout);

//////////////////////////////////////////////////////////////////////////////////////

//подлючаем обработчик несуществующего рута
router.use((req, res, next) => {
  next(new NotFoundError('Запрошен несуществующий роут.'));
});

//подключаем обработчик ошибок celebrate
router.use(errors());

//////////////////////////////////////////////////////////////////////////////////////

//экспорт
module.exports = router;
