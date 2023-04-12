//импорты
const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const userRouter = require('./users');
//const movieRouter = require('./movies');
const { login, createUser } = require('../controllers/users');
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
  login
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
  createUser
);

//////////////////////////////////////////////////////////////////////////////////////

//подлючаем обработчик несуществующего рута
router.use((req, res, next) => {
  next(new NotFoundError('Запрошен несуществующий роут.'));
});

//подключаем обработчик ошибок celebrate
router.use(errors());

//подключаем рутер пользователя
router.use('/users', userRouter);

//////////////////////////////////////////////////////////////////////////////////////

//экспорт
module.exports = router;
