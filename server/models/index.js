const db = require('../db');
const DataLoader = require("dataloader");

const models = {
  getKeyset: async ({ id }) => {
    let client = await db.connect();
    let result = await client.query("SELECT products.id, products.name, products.tags, products.vendor_id, products.description, products.price, products.quantity, products.url, products.available, keysets.id as keyset_id, keysets.manufacturer, keysets.material, keysets.profile, keysets.kits FROM keysets LEFT JOIN products ON keysets.product_id=products.id WHERE keysets.id=$1::int LIMIT 1", [id]);
    client.release();
    return result.rows;
  },

  getKeysets: async () => {
    let client = await db.connect();
    let sqlquery = "SELECT products.id, products.name, products.tags, products.vendor_id, products.description, products.price, products.quantity, products.url, products.available, keysets.id as keyset_id, keysets.manufacturer, keysets.material, keysets.profile, keysets.kits FROM keysets LEFT JOIN products ON keysets.product_id=products.id";
    let result = await client.query(sqlquery);
    client.release();
    return result.rows;
  },

  getKeysetsByVendorId: async (ids) => {
    let client = await db.connect();
    let sqlquery = 'select json_agg(products.*) from products inner join keysets on products.id=keysets.product_id where vendor_id=ANY($1::int[]) GROUP BY vendor_id;';
    let result = await client.query(sqlquery, [ids]);
    client.release();
    return result.rows.map(row => row.json_agg);
  },

  insertKeyset: async (params) => {
    let client = await db.connect();
    let sqlquery = 'BEGIN; INSERT INTO products (name, tags, vendor_id, description, product_type, price, quantity, url, available) VALUES($1,$2); INSERT INTO keysets(manufacturer, material, profile, kits) VALUES ($3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *; COMMIT;'
    let result = await client.query(sqlquery, params);
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