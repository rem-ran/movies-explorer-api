require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const { DB_ADDRESS, PORT } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    maxAge: 300,
  })
);

app.use(cookieParser());

app.use(express.json());

//подклчюение к базе mongoDB
mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

//подключаем логгер запросов
app.use(requestLogger);

//подключаем руты
app.use(routes);

//подключаем логгер ошибок
app.use(errorLogger);

app.listen(PORT);
