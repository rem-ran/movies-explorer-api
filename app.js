require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { DB_ADDRESS, PORT } = require('./config');

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

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

app.listen(PORT);
