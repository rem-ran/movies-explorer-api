//импорты
const mongoose = require('mongoose');
const Movie = require('../models/user');

//////////////////////////////////////////////////////////////////////////////////////

//контроллер получения всех сохранённых текущим пользователем фильмов
module.exports.getUserSavedMovies = (req, res, next) => {};

//////////////////////////////////////////////////////////////////////////////////////

//контроллер создания нового фильма
module.exports.addMovie = (req, res, next) => {};

//////////////////////////////////////////////////////////////////////////////////////

//контроллер удаления сохранённого пользователем фильма
module.exports.deleteSavedMovie = (req, res, next) => {};

// # возвращает все сохранённые текущим  пользователем фильмы
// GET /movies

// # создаёт фильм с переданными в теле
// # country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
// POST /movies

// # удаляет сохранённый фильм по id
// DELETE /movies/_id
