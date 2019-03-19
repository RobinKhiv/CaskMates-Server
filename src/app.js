/* eslint-disable no-console */
'use strict';

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const whiskeysRouter = require('./whiskeys/whiskey-router');
const reviewsRouter = require('./reviews/reviews-router');
const usersRouter =require('./Users/users-router');
const authRouter = require('./auth/auth-router');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'dev';

app.use(morgan(morganOption, {
  skip: () => NODE_ENV === 'test'
}));

app.use(helmet());
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello, world!');});

app.use('/api/whiskeys', whiskeysRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);


app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;