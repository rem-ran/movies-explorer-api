// импорты
const router = require('express').Router();

const {
  getUserSavedMovies,
  addMovie,
  deleteSavedMovie,
} = require('../controllers/movies');

const {
  movieCreateValidation,
  movieDeleteValidation,
} = require('../middlewares/movieInputValidator');

/// ///////////////////////////////////////////////////////////////////////////////////

// рутер получения всех сохранённых текущим пользователем фильмов
router.get('/', getUserSavedMovies);

/// ///////////////////////////////////////////////////////////////////////////////////

// рутер создания нового фильма
router.post(
  '/',
  // валидируем поля на этапе ввода
  movieCreateValidation(),
  // подключаем котроллер создания
  addMovie,
);

/// ///////////////////////////////////////////////////////////////////////////////////

// рутер удаления сохранённого пользователем фильма
router.delete(
  '/:movieId',
  // валидируем поля на этапе ввода
  movieDeleteValidation(),
  // подключаем котроллер удаления
  deleteSavedMovie,
);

/// ///////////////////////////////////////////////////////////////////////////////////

// экспорт
module.exports = router;
