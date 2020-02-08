const db = require('../db');
const mysql = require('mysql');

exports.getKeyset = ({ id }) => {
  return new Promise((resolve, reject) => {
    let sqlquery = `select * from keysets where id = ?`;
    sqlquery = mysql.format(sqlquery, [id]);
    db.query(sqlquery, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};