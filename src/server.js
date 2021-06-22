'use strict';
const knex = require('knex');
const express = require('express')
const app = express();
const { PORT, DB_URL } = require('./config');

const db = knex({
  client: 'pg',
  connection: DB_URL
});

app.set('db', db);

app.listen(4000, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${PORT}`);
});