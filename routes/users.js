//импорты
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUser, updateUser } = require('../controllers/users');

//////////////////////////////////////////////////////////////////////////////////////

//рутер получения своего пользователя
router.get('/me', getUser);

//////////////////////////////////////////////////////////////////////////////////////

//рутер обновления данных своего пользователя
router.patch(
  '/me',
  //валидируем поля на этапе ввода
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  }),
  updateUser
);

//////////////////////////////////////////////////////////////////////////////////////

//экспорт
module.exports = router;

// # возвращает информацию о пользователе (email и имя)
// GET /users/me

// # обновляет информацию о пользователе (email и имя)
// PATCH /users/me
