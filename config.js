const { PORT = 3000 } = process.env;

// Адрес базы данных
const DB_ADDRESS = 'mongodb://127.0.0.1:27017/moviesDB';

// проверка валидности url
const regexUrl =
  /https?:\/\/(www\.)?[-a-zA-Z0-9.]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#'?&//=]*)/;

module.exports = {
  DB_ADDRESS,
  regexUrl,
  PORT,
};
