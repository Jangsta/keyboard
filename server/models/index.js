const db = require('../db');
const DataLoader = require("dataloader");

const models = {
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

  getKeysetsByVendorId: async (ids) => {
    let client = await db.connect();
    let sqlquery = 'select json_agg(keysets.*) from keysets where vendor_id=ANY($1::int[]) GROUP BY vendor_id';
    let result = await client.query(sqlquery, [ids]);
    client.release();
    return result.rows.map(row => row.json_agg);
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
  },

  getVendorsById: async (ids) => {
    let client = await db.connect();
    let sqlquery = 'SELECT * from vendors WHERE id = ANY($1::int[])';
    let result = await client.query(sqlquery, [ids]);
    client.release();
    return result.rows;
  }
};

const dataloaders = {
  getVendorsByIdDataloader: new DataLoader(models.getVendorsById),
  getKeysetsByIdDataloader: new DataLoader(models.getKeysetsByVendorId)
};

module.exports = {...dataloaders, ...models};