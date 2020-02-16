const { password } = require('./config.js');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'keyboard',
  password: password,
  port: 5432,
});

module.exports = pool;