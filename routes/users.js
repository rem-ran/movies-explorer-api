// импорты
const router = require('express').Router();
const { userPatchValidation } = require('../middlewares/userInputValidators');

const { getUser, updateUser } = require('../controllers/users');

/// ///////////////////////////////////////////////////////////////////////////////////

// рутер получения своего пользователя
router.get('/me', getUser);

/// ///////////////////////////////////////////////////////////////////////////////////

// рутер обновления данных своего пользователя
router.patch(
  '/me',
  // валидируем поля на этапе ввода
  userPatchValidation(),
  // подключаем котроллер обновления
  updateUser,
);

/// ///////////////////////////////////////////////////////////////////////////////////

// экспорт
module.exports = router;
