const { PORT = 3000 } = process.env;

// Адрес базы данных
const DB_ADDRESS = 'mongodb://127.0.0.1:27017/moviesDB';

module.exports = {
  DB_ADDRESS,
  PORT,
};
