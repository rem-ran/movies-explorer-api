const { isCelebrateError } = require("celebrate");
const { ERROR_CODE_400, ERROR_CODE_500 } = require("../config");

// централизованный обработчик ошибок
const errorHandler = (err, req, res, next) => {
  const { statusCode = ERROR_CODE_500, message } = err;

  //проверям ошибку на принадлежность к celebrate
  if (isCelebrateError(err)) {
    //достём details из Map()
    const errorBody = err.details.get("body");
    //достаём массив из details
    const {
      details: [errorDetails],
    } = errorBody;
    //возвращаем только сообщение об ошибке
    return res.status(ERROR_CODE_400).send({ message: errorDetails.message });
  }

  res.status(statusCode).send({
    message:
      statusCode === ERROR_CODE_500 ? "На сервере произошла ошибка." : message,
  });
};

module.exports = { errorHandler };
