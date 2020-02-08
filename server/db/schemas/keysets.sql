CREATE DATABASE IF NOT EXISTS keyboard;

USE keyboard;

DROP TABLE IF EXISTS keysets;
DROP TABLE IF EXISTS keyboards;
DROP TABLE IF EXISTS vendors;

CREATE TABLE vendors(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(3000),
  website_url VARCHAR(300), -- main website url
  instagram_url VARCHAR(300),
  discord_url VARCHAR(300),
  facebook_url VARCHAR(300),
  twitter_url VARCHAR(300),
  other_url VARCHAR(300),
  payment_types VARCHAR(100), -- list of payment types ex. paypal,google pay,apple pay
  location VARCHAR(50) -- ex. US,EU,SEA
);

CREATE TABLE keysets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30),
  manufacturer VARCHAR(100), -- gmk, epbt
  material VARCHAR(30), -- expects abs, pbt
  profile VARCHAR(30), -- cherry, kat, dcs
  kits VARCHAR(300),
  tags VARCHAR(500), -- just csv for now
  vendor_id INT,
  url VARCHAR(300),
  image_url VARCHAR(300),
  description VARCHAR(3000),
  price INT,
  quantity INT,
  available BOOLEAN,
  FOREIGN KEY (vendor_id) REFERENCES vendors (id)
);

CREATE TABLE keyboards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tags VARCHAR(500), -- just csv for now
  name VARCHAR(30),
  description VARCHAR(3000),
  vendor_id INT,
  price INT,
  quantity INT,
  available BOOLEAN,
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
  FOREIGN KEY (vendor_id) REFERENCES vendors(id)
);

insert into vendors(name,description,website_url,instagram_url,discord_url,facebook_url,twitter_url,payment_types,location) values('drop','formerly named massdrop','https://drop.com','https://www.instagram.com/drop',null,'https://www.facebook.com/drop','https://twitter.com/drop','paypal','US');

insert into keysets(name, manufacturer,material,profile,kits,tags,vendor_id,url,image_url,description, price,quantity,available) values('gmk laser', 'gmk', 'abs', 'cherry', 'cyberdeck,gaijin,kobe,blocknet,mitowaves,ergo,euro,spacebars,colverak', null, 1, 'https://drop.com/buy/drop-mito-sa-laser-custom-keycap-set', 'https://massdrop-s3.imgix.net/product-images/massdrop-x-mito-gmk-laser-custom-keycap-set/pc_20171031145722.jpg?auto=format&fm=jpg&fit=fill&w=820&h=547&bg=f0f0f0&dpr=2&q=35', 'Step into a world full of bright lights and dark shadows, and artificial intelligence and genuine ‘80s nostalgia with MiTo’s latest set: GMK Laser. Designed by the creator of XDA Godspeed, XDA Canvas, and DSA Legacy, GMK Laser is dripping with futuristic colors and cultural references from the cyberpunk past. Look for allusions to William Gibson’s Neuromancer, Ridley Scott’s Blade Runner, and even Stranger Things. The alphas, done in violet, pair gracefully with the midnight purple modifiers. Brought to life by hot pink and teal legends, the set looks like it was shot straight from the barrel of a laser gun.', 109.99, 2103, false);