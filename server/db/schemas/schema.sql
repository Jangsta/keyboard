\c keyboard;

DROP TABLE IF EXISTS group_buys;
DROP TABLE IF EXISTS keysets;
DROP TABLE IF EXISTS keyboards;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS vendors;

CREATE TABLE vendors(
  id SERIAL UNIQUE,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(5000),
  website_url VARCHAR(300), -- main website url
  instagram_url VARCHAR(300),
  discord_url VARCHAR(300),
  facebook_url VARCHAR(300),
  twitter_url VARCHAR(300),
  other_url VARCHAR(300),
  payment_types VARCHAR(100), -- list of payment types ex. paypal,google pay,apple pay
  location VARCHAR(50) -- ex. US,EU,SEA
);

CREATE TABLE products (
  id SERIAL UNIQUE,
  name VARCHAR(30),
  tags VARCHAR(500), -- just csv for now
  vendor_id INT,
  description VARCHAR(5000),
  product_type INT, -- 1: keysets, 2: keyboards
  price INT,
  quantity INT,
  url VARCHAR(300),
  available BOOLEAN,

  FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE images (
  id SERIAL UNIQUE,
  product_id INT,
  comment VARCHAR(3000),
  url VARCHAR(300),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE group_buys (
  id SERIAL UNIQUE,
  product_id INT NOT NULL,
  start_date DATE,
  end_date DATE,
  geekhack_url VARCHAR(300),
  reddit_url VARCHAR(300),
  vendor_url VARCHAR(300),
  other_url VARCHAR(3000),
  -- FOREIGN KEY (vendor_id) REFERENCES vendors (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE RESTRICT ON UPDATE CASCADE
  -- FOREIGN KEY (other_urls_id) REFERENCES urls (id) ON DELETE RESTRICT ON UPDATE CASCADE,
);

CREATE TABLE keysets (
  id SERIAL UNIQUE,
  product_id INT NOT NULL,
  manufacturer VARCHAR(100), -- gmk, epbt
  material VARCHAR(30), -- expects abs, pbt
  profile VARCHAR(30), -- cherry, kat, dcs
  kits VARCHAR(300),
  FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE keyboards (
  id SERIAL UNIQUE,
  product_id INT NOT NULL,
  creator VARCHAR(50), -- designer name, example: Zambumon
  mount_style VARCHAR(100), -- expects top-mount, gasket-mount, etc.
  hotswap BOOLEAN, -- hotswap or soldered
  layout VARCHAR(100), -- example: ortholinear, ergonomic, alice, split
  size INT, -- expects 60, 65, 75, etc.
  weight DECIMAL(8,2), -- weight in lbs
  rgb VARCHAR(30), -- expects per-key, underglow, none, etc.
  plate_type VARCHAR(30), -- expects full, half, noplate
  plate_material VARCHAR(30), -- expects aluminum, brass, carbon fiber, fre4, polycarbonate, acrylic, etc.
  angle DECIMAL(10,2), -- in degrees, example: 6.5 (° implied)
  build_options VARCHAR(30), -- expects kit, prebuilt
  programmability VARCHAR(30), -- expects fully programmable
  switch_compatability VARCHAR(30), -- expects mx, alps
  dimensions VARCHAR(200), -- expects string 100cmx100cmx100cm
  first_appearance DATE,
  connector VARCHAR(20),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Remove price, quantity, name, tags

insert into vendors(name,description,website_url,instagram_url,discord_url,facebook_url,twitter_url,payment_types,location) values('Drop','formerly named Massdrop','https://drop.com','https://www.instagram.com/drop',null,'https://www.facebook.com/drop','https://twitter.com/drop','paypal','US');

insert into vendors(name,description,website_url,instagram_url,discord_url,facebook_url,twitter_url,payment_types,location) values('NovelKeys','Novelkeys is a community vendor ran by /u/mgsickler. Products include keycaps, switches, lube, stabilizers, and more. It has one of the widest variety of switches, especially Kailh switches, and even stocks exclusive switches. Novelkeys also consistently runs keycap group buys every month','https://novelkeys.xyz/','https://www.instagram.com/novel.keys/',null,'https://www.facebook.com/novelkeys',null,'paypal,googlepay','US');

insert into products(tags,name,vendor_id,description,product_type,price,quantity,url,available) values(null, 'GMK Laser', 1, 'Step into a world full of bright lights and dark shadows, and artificial intelligence and genuine ‘80s nostalgia with MiTo’s latest set: GMK Laser. Designed by the creator of XDA Godspeed, XDA Canvas, and DSA Legacy, GMK Laser is dripping with futuristic colors and cultural references from the cyberpunk past. Look for allusions to William Gibson’s Neuromancer, Ridley Scott’s Blade Runner, and even Stranger Things. The alphas, done in violet, pair gracefully with the midnight purple modifiers. Brought to life by hot pink and teal legends, the set looks like it was shot straight from the barrel of a laser gun.', 1, 109.99, 2103, 'https://drop.com/buy/drop-mito-sa-laser-custom-keycap-set', false);

insert into keysets(product_id, manufacturer,material,profile, kits) values(1, 'gmk', 'abs', 'cherry', 'cyberdeck,gaijin,kobe,blocknet,mitowaves,ergo,euro,spacebars,colverak');

insert into products(tags,name,vendor_id,description,product_type,price,quantity,url,available) values(null, 'GMK Red Samurai', 1, 'Strap on some armor, unsheath your katana, and prepare to defend your desktop: GMK Red Samurai, the first keycap set from designer RedSuns, features a striking three-toned colorway evocative of a Japanese warrior’s armor. The fierce combination of red and dark gray with golden accents and legends will complement any keyboard, especially dark ones. The inspiration behind the set came from the designer’s interest in Japanese general Ii Naomasa, who played a crucial role in creating the Samurai code during the feudal era. He was also known for charging into battle with vivid red armor to intimidate his enemies. Sculpted in Cherry profile, GMK Red Samurai is compatible with Cherry MX switches and clones.', 1, 129.99, 2103, 'https://drop.com/buy/massdrop-x-redsuns-gmk-red-samurai-keycap-set', false);

insert into keysets(id,product_id, manufacturer,material,profile, kits) values(5,2, 'gmk', 'abs', 'cherry', 'base,nishi,hiragana,novelties,ergoplanck,norde,dc,spacebars');

insert into products(tags,name,vendor_id,description,product_type,price,quantity,url,available) values(null, 'GMK Olivia++', 2, 'Olivia is back with the second round of GMK Olivia - Olivia++. This round features two large base kits - one with the original colors, and one with the dark mode. Rama Works has also collaborated on this set offering a brass PVD rose gold enter keycap. This set is produced by GMK with doubleshot ABS plastic. It is compatible with MX switches.', 1, 109.99, 4310, 'https://novelkeys.xyz/products/gmk-oliviaplusplus-gb', false);

insert into keysets(product_id, manufacturer,material,profile, kits) values(3, 'gmk', 'abs', 'cherry', 'light base,dark base,novelties,extension,iso,spacebars,hihihi,RAMA enter');