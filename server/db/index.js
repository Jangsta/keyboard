const { password } = require('./config.js');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  database: 'keyboard',
  user: 'student',
  password: 'password'
}, ()=>{
  console.log('mysql connected');
});

module.exports = connection;

