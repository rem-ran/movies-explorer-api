// импорты
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');

const SameEntryError = require('../errors/SameEntryError');
const ValidationError = require('../errors/ValidationError');

const { sameEmailUserMsg, logoutOkMsg } = require('../config');

/// ///////////////////////////////////////////////////////////////////////////////////

// контроллер создания нового пользователя
module.exports.userRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    // создаём нового пользователя, хешируя его пароль
    .then((hash) => User.create({ name, email, password: hash }))
    // возвращаем нового пользователя без пароля
    .then(() => {
      res.send(new User({ name, email }));
    })

    .catch((err) => {
      // проверяем на ошибку валидации
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError(err));
      }

      // проверяем на ошибку базы данных, если такой пользователь в ней уже существует
      if (err.code === 11000) {
        return next(
          new SameEntryError(sameEmailUserMsg),
        );
      }

      // передаём ошибки дальше в общий обработчик
      return next(err);
    });
};

/// ///////////////////////////////////////////////////////////////////////////////////

// контроллер логина пользователя
module.exports.userLogin = (req, res, next) => {
  const { email, password } = req.body;

  const { NODE_ENV, JWT_SECRET } = process.env;

  return (
    // ищём пользователя по полям email и password
    User.findUserByCredentials(email, password)

      // создаём токен
      .then((user) => {
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '7d' },
        );

        // кладём токен в куки
        res
          .cookie('jwt', token, {
            maxAge: 3600000,
            httpOnly: true,
            sameSite: true,
          })

          .send({
            email,
            name: user.name,
            _id: user._id,
          });
      })

      // передаём ошибки дальше в общий обработчик
      .catch(next)
  );
};

/// ///////////////////////////////////////////////////////////////////////////////////

// котроллер выхода пользователя
module.exports.userSignout = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then(() => res.clearCookie('jwt').send({ message: logoutOkMsg }))

    // передаём ошибки дальше в общий обработчик
    .catch(next);
};

/// ///////////////////////////////////////////////////////////////////////////////////

// контроллер получания пользователя
module.exports.getUser = (req, res, next) => {
  const { _id } = req.user;

  // находим пользователя по его id в базе данных и возвращаем его
  User.findById(_id)
    .then((user) => res.send(user))

    // передаём ошибки дальше в общий обработчик
    .catch(next);
};

/// ///////////////////////////////////////////////////////////////////////////////////

// контроллер обновления данных пользователя
module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  // находим пользователя по id для обновления полей name и email
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      runValidators: true,
    },
  )

    // возвращаем обновлённые поля найденного пользоваля
    .then((user) => res.send({
      name,
      email,
      _id: user._id,
    }))

    .catch((err) => {
      // проверяем на ошибку валидации
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError(err));
      }

      // проверяем на ошибку базы данных, если такой пользователь в ней уже существует
      if (err.code === 11000) {
        return next(
          new SameEntryError(sameEmailUserMsg),
        );
      }

      // передаём ошибки дальше в общий обработчик
      return next(err);
    });
};
