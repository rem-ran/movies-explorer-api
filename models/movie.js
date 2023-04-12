//импорты
const mongoose = require("mongoose");
const { regexUrl } = require("../config");

//////////////////////////////////////////////////////////////////////////////////////

//схема фильма
const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return regexUrl.test(v);
      },
      message: "Введите корректную ссылку",
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return regexUrl.test(v);
      },
      message: "Введите корректную ссылку",
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return regexUrl.test(v);
      },
      message: "Введите корректную ссылку",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

//////////////////////////////////////////////////////////////////////////////////////

//экспорт
module.exports = mongoose.model("movie", movieSchema);

//// country — страна создания фильма. Обязательное поле-строка.
//// director — режиссёр фильма. Обязательное поле-строка.
//// duration — длительность фильма. Обязательное поле-число.
//// year — год выпуска фильма. Обязательное поле-строка.
//// description — описание фильма. Обязательное поле-строка.
// image — ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
// trailerLink — ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
// thumbnail — миниатюрное изображение постера к фильму. Обязательное поле-строка. Запишите её URL-адресом.
// owner — _id пользователя, который сохранил фильм. Обязательное поле.
// movieId — id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле.
//// nameRU — название фильма на русском языке. Обязательное поле-строка.
//// nameEN — название фильма на английском языке. Обязательное поле-строка.
