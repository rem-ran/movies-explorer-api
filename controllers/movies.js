//импорты
const mongoose = require("mongoose");
const Movie = require("../models/user");

const NotFoundError = require("../errors/NotFoundError");
const NoRightsError = require("../errors/NoRightsError");
const ValidationError = require("../errors/ValidationError");

//////////////////////////////////////////////////////////////////////////////////////

//контроллер получения всех сохранённых текущим пользователем фильмов
module.exports.getUserSavedMovies = (req, res, next) => {
  Movie.find({})

    .populate(["owner"])

    .then((movies) => res.send(movies))

    //передаём ошибки дальше в общий обработчик
    .catch(next);
};

//////////////////////////////////////////////////////////////////////////////////////

//контроллер создания нового фильма
module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  const owner = req.user._id;

  //создаём новый фильм
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })

    .then((movie) => movie.populate("owner"))

    .then((movie) => res.status(CODE_201).send(movie))

    .catch((err) => {
      //проверяем на ошибку валидации
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError(err));
      }

      //передаём ошибки дальше в общий обработчик
      return next(err);
    });
};

//////////////////////////////////////////////////////////////////////////////////////

//контроллер удаления сохранённого пользователем фильма
module.exports.deleteSavedMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id } = req.user;

  //ищем фильм по id
  Card.findById(movieId)

    .populate(["owner"])

    .then((movie) => {
      //проверяем найден ли фильм по указанному id
      if (!movie) {
        throw new NotFoundError("Фильм по указанному _id не найден.");
      }

      //проверям кто сохранил фильм
      if (movie.owner.toString() !== _id.toString()) {
        throw new NoRightsError("Нельзя удалять чужие фильмы.");
      }

      //если условия выше соблюдены, удаляем фильм
      return Movie.deleteOne(movieId);
    })

    .then(() => res.send({ message: "Фильм удален." }))

    .catch((err) => {
      //проверяем на ошибку валидации
      if (err instanceof mongoose.Error.CastError) {
        return next(new NotFoundError("Указан некорректный id фильма."));
      }

      //передаём ошибки дальше в общий обработчик
      return next(err);
    });
};

// # возвращает все сохранённые текущим  пользователем фильмы
// GET /movies

// # создаёт фильм с переданными в теле
// # country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
// POST /movies

// # удаляет сохранённый фильм по id
// DELETE /movies/_id
