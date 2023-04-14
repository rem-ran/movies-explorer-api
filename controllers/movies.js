//импорты
const mongoose = require("mongoose");
const Movie = require("../models/movie");

const { CODE_201 } = require("../config");

const NotFoundError = require("../errors/NotFoundError");
const NoRightsError = require("../errors/NoRightsError");
const ValidationError = require("../errors/ValidationError");

//////////////////////////////////////////////////////////////////////////////////////

//контроллер получения всех сохранённых текущим пользователем фильмов
module.exports.getUserSavedMovies = (req, res, next) => {
  Movie.find({})

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
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    trailerLink,
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
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    trailerLink,
    owner,
  })

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
  Movie.findById(movieId)

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
      return Movie.deleteOne({ _id: movieId });
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
