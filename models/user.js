const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

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
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Имя должно состоять как минимум из 2 символов'],
    maxlength: [30, 'Имя должно состоять максимум из 30 символов'],
  },
});

module.exports = mongoose.model('user', userSchema);
