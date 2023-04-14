// импорты
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');

const AuthError = require('../errors/AuthError');

/// ///////////////////////////////////////////////////////////////////////////////////

// схема пользователя
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле email обязательно к заполнению'],
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Имя должно состоять как минимум из 2 символов'],
    maxlength: [30, 'Имя должно состоять максимум из 30 символов'],
  },
});

/// ///////////////////////////////////////////////////////////////////////////////////

// проверка совпадения полей email и password при авторизации пользователя
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthError('Неправильные почта или пароль'));
        }

        return user;
      });
    });
};

/// ///////////////////////////////////////////////////////////////////////////////////

// экспорт
module.exports = mongoose.model('user', userSchema);
