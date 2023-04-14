//импорты
const { celebrate, Joi } = require("celebrate");

//////////////////////////////////////////////////////////////////////////////////////

//объект с ключами для валидации инпутов пользователя
const userValKeys = {
  password: Joi.string().required(),
  email: Joi.string().required().email(),
  name: Joi.string().required().min(2).max(30),
};

//////////////////////////////////////////////////////////////////////////////////////

//общий метод валидации
const userValidation = ({ ...args }) => {
  return celebrate({
    body: Joi.object().keys(args),
  });
};

//////////////////////////////////////////////////////////////////////////////////////

//метод валидации регистрации пользователя
const signupValidation = () => {
  return userValidation({
    password: userValKeys.password,
    email: userValKeys.email,
    name: userValKeys.name,
  });
};

//////////////////////////////////////////////////////////////////////////////////////

//метод валидации авторизации пользователя
const signinValidation = () => {
  return userValidation({
    password: userValKeys.password,
    email: userValKeys.email,
  });
};

//////////////////////////////////////////////////////////////////////////////////////

//метод валидации обновления данных пользователя
const userPatchValidation = () => {
  return userValidation({
    email: userValKeys.email,
    name: userValKeys.name,
  });
};

//////////////////////////////////////////////////////////////////////////////////////

//экспорт
module.exports = { signupValidation, signinValidation, userPatchValidation };
