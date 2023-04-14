//импорты
const { celebrate, Joi } = require("celebrate");

//////////////////////////////////////////////////////////////////////////////////////

//объект с ключами для валидации инпутов пользователя
const userValKeys = {
  password: Joi.string().required().messages({
    "string.base": `Поле {#label} должно быть строкой`,
    "string.empty": `Поле {#label} не может быть пустым`,
    "any.required": `Поле {#label} обязательно для заполнения`,
  }),
  email: Joi.string().required().email().messages({
    "string.email": "Поле {#label} должно быть валидным имеил адресом",
    "string.empty": `Поле {#label} не может быть пустым`,
    "any.required": `Поле {#label} обязательно для заполнения`,
  }),
  name: Joi.string().required().min(2).max(30).messages({
    "string.base": `Поле {#label} должно быть строкой`,
    "string.empty": `Поле {#label} не может быть пустым`,
    "string.min": `Поле {#label} должго быть минимум {#limit} символов`,
    "string.max": `Поле {#label} должго быть максимум {#limit} символов`,
    "any.required": `Поле {#label} обязательно для заполнения`,
  }),
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
