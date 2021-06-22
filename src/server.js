'use strict';
const app = require('./app');
const knex = require('knex');
const parse = require('pg-connection-string').parse;
const { PORT, DATABASE_URL } = require('./config');

const pgconfig = parse(DATABASE_URL);
pgconfig.ssl = true;

const db = knex({
  client: 'pg',
  connection: {
    connectionString : DATABASE_URL,
    ssl: false
  }
});

app.set('db', db);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${PORT}`);
});