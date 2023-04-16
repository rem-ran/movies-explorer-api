// импорты
const { isCelebrateError } = require('celebrate');
const { ERROR_CODE_400, ERROR_CODE_500 } = require('../config');

const { serverErrorMsg } = require('../config');

/// ///////////////////////////////////////////////////////////////////////////////////

// централизованный обработчик ошибок
const errorHandler = (err, req, res, next) => {
  // достём статус ошибки (если его нет, задаём по умолчанию) и достаём message
  const { statusCode = ERROR_CODE_500, message } = err;

  // проверям ошибку на принадлежность к celebrate
  if (isCelebrateError(err)) {
    // достём details из Map()
    const errorBody = err.details.get('body') || err.details.get('params');
    // достаём массив из details
    const {
      details: [errorDetails],
    } = errorBody;

    // возвращаем только сообщение об ошибке
    return res.status(ERROR_CODE_400).send({ message: errorDetails.message });
  }

  // проверям статус ошибки и отправлеям соответсвующее ему сообщение
  return res.status(statusCode).send({
    message:
      statusCode === ERROR_CODE_500 ? serverErrorMsg : message,
  });
};

/// ///////////////////////////////////////////////////////////////////////////////////

// экспорт
module.exports = { errorHandler };
