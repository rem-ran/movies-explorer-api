// импорты
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const { rateLimiter } = require('./middlewares/rateLimit');
const routes = require('./routes/index');
const { DB_ADDRESS, PORT } = require('./config');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

/// ///////////////////////////////////////////////////////////////////////////////////

// подключаем эксперсс
const app = express();

// подклчючаем защиту helmet
app.use(helmet());

// выставляем разрешённые адреса для подключения к нашему приложению
app.use(
  cors({
    origin: ['https://remran.nomoredomains.monster'],
    credentials: true,
    maxAge: 300,
  }),
);

// подключаем обработчик куки
app.use(cookieParser());

// парсим входящие json в req.body
app.use(express.json());

// подключаем логгер запросов
app.use(requestLogger);

// подключаем ограничитель запросов
app.use(rateLimiter);

// подклчюение к базе mongoDB
mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

// подключаем руты
app.use(routes);

// подключаем логгер ошибок
app.use(errorLogger);

// подключаем централизованный обработчик ошибок
app.use(errorHandler);

// выставляем порт
app.listen(PORT);
