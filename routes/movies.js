//импорты
const router = require("express").Router();

const {
  getUserSavedMovies,
  addMovie,
  deleteSavedMovie,
} = require("../controllers/movies");

//////////////////////////////////////////////////////////////////////////////////////

//рутер получения всех сохранённых текущим пользователем фильмов
router.get("/", getUserSavedMovies);

//////////////////////////////////////////////////////////////////////////////////////

//рутер создания нового фильма
router.post("/", addMovie);

//////////////////////////////////////////////////////////////////////////////////////

//рутер удаления сохранённого пользователем фильма
router.delete("/:movieId", deleteSavedMovie);

//////////////////////////////////////////////////////////////////////////////////////

//экспорт
module.exports = router;
