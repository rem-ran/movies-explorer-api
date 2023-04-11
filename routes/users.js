const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

module.exports = router;

// # возвращает информацию о пользователе (email и имя)
// GET /users/me

// # обновляет информацию о пользователе (email и имя)
// PATCH /users/me
