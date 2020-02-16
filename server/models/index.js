const db = require('../db');

module.exports = {
  getKeyset: async ({ id }) => {
    let client = await db.connect();
    let result = await client.query("SELECT * FROM keysets WHERE id=$1::int LIMIT 1", [id]);
    client.release();
    return result.rows;
  },

  getKeysets: async () => {
    let client = await db.connect();
    let sqlquery = "SELECT * FROM keysets";
    let result = await client.query(sqlquery);
    client.release();
    return result.rows;
  },

  getVendor: async ({ id }) => {
    let client = await db.connect();
    let sqlquery = 'SELECT * FROM vendors WHERE id=$1::int';
    let result = await client.query(sqlquery, [id]);
    client.release();
    return result.rows;
  },

  getVendors: async () => {
    let client = await db.connect();
    let sqlquery = 'SELECT * FROM vendors';
    let results = await client.query(sqlquery);
    client.release();
    return results.rows;
  }
};