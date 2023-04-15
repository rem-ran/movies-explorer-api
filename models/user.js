// импорты
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');

const AuthError = require('../errors/AuthError');

const {
  emailRequiredMsg,
  invalidEmailMsg,
  invalidNameMaxLengthMsg,
  invalidNameMinLengthMsg,
  wrongEmailOrPassMsg,
} = require('../config');

/// ///////////////////////////////////////////////////////////////////////////////////

// схема пользователя
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, emailRequiredMsg],
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: invalidEmailMsg,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: [2, invalidNameMinLengthMsg],
    maxlength: [30, invalidNameMaxLengthMsg],
  },
});

/// ///////////////////////////////////////////////////////////////////////////////////

// проверка совпадения полей email и password при авторизации пользователя
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError(wrongEmailOrPassMsg));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthError(wrongEmailOrPassMsg));
        }

        return user;
      });
    });
};

/// ///////////////////////////////////////////////////////////////////////////////////

// экспорт
module.exports = mongoose.model('user', userSchema);
