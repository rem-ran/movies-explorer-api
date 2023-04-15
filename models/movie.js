// импорты
const mongoose = require('mongoose');
const { regexUrl } = require('../config');

const { validUrlRequiredMsg } = require('../config');

/// ///////////////////////////////////////////////////////////////////////////////////

// схема фильма
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
    type: Number,
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
      message: validUrlRequiredMsg,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return regexUrl.test(v);
      },
      message: validUrlRequiredMsg,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return regexUrl.test(v);
      },
      message: validUrlRequiredMsg,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
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

/// ///////////////////////////////////////////////////////////////////////////////////

// экспорт
module.exports = mongoose.model('movie', movieSchema);
