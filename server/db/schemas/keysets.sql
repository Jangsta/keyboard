\c keyboard;

DROP TABLE IF EXISTS keysets;
DROP TABLE IF EXISTS keyboards;
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

DROP TABLE IF EXISTS images;

CREATE TABLE images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  comment VARCHAR(3000),
  url VARCHAR(300),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE keysets (
  id SERIAL UNIQUE,
  name VARCHAR(30),
  manufacturer VARCHAR(100), -- gmk, epbt
  material VARCHAR(30), -- expects abs, pbt
  profile VARCHAR(30), -- cherry, kat, dcs
  kits VARCHAR(300),
  tags VARCHAR(500), -- just csv for now
  vendor_id INT,
  url VARCHAR(300),
  image_url VARCHAR(300),
  description VARCHAR(5000),
  price INT,
  quantity INT,
  available BOOLEAN,
  FOREIGN KEY (vendor_id) REFERENCES vendors (id)
);

CREATE TABLE keyboards (
  id SERIAL UNIQUE,
  tags VARCHAR(500), -- just csv for now
  name VARCHAR(30),
  description VARCHAR(5000),
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

insert into vendors(name,description,website_url,instagram_url,discord_url,facebook_url,twitter_url,payment_types,location) values('Drop','formerly named Massdrop','https://drop.com','https://www.instagram.com/drop',null,'https://www.facebook.com/drop','https://twitter.com/drop','paypal','US');

insert into keysets(name, manufacturer,material,profile,kits,tags,vendor_id,url,image_url,description, price,quantity,available) values('GMK Laser', 'gmk', 'abs', 'cherry', 'cyberdeck,gaijin,kobe,blocknet,mitowaves,ergo,euro,spacebars,colverak', null, 1, 'https://drop.com/buy/drop-mito-sa-laser-custom-keycap-set', 'https://massdrop-s3.imgix.net/product-images/massdrop-x-mito-gmk-laser-custom-keycap-set/pc_20171031145722.jpg?auto=format&fm=jpg&fit=fill&w=820&h=547&bg=f0f0f0&dpr=2&q=35', 'Step into a world full of bright lights and dark shadows, and artificial intelligence and genuine ‘80s nostalgia with MiTo’s latest set: GMK Laser. Designed by the creator of XDA Godspeed, XDA Canvas, and DSA Legacy, GMK Laser is dripping with futuristic colors and cultural references from the cyberpunk past. Look for allusions to William Gibson’s Neuromancer, Ridley Scott’s Blade Runner, and even Stranger Things. The alphas, done in violet, pair gracefully with the midnight purple modifiers. Brought to life by hot pink and teal legends, the set looks like it was shot straight from the barrel of a laser gun.', 109.99, 2103, false);

insert into keysets(name, manufacturer,material,profile,kits,tags,vendor_id,url,image_url,description, price,quantity,available) values('GMK Red Samurai', 'gmk', 'abs', 'cherry', 'base,nishi,hiragana,novelties,ergoplanck,norde,dc,spacebars', null, 1, 'https://drop.com/buy/massdrop-x-redsuns-gmk-red-samurai-keycap-set', 'https://massdrop-s3.imgix.net/product-images/massdrop-x-redsuns-gmk-red-samurai-keycap-set/7YKNKVQT6m1ewgcHsAZw_2.jpg?auto=format&fm=jpg&fit=crop&w=1080&bg=f0f0f0&dpr=2&q=35', 'Strap on some armor, unsheath your katana, and prepare to defend your desktop: GMK Red Samurai, the first keycap set from designer RedSuns, features a striking three-toned colorway evocative of a Japanese warrior’s armor. The fierce combination of red and dark gray with golden accents and legends will complement any keyboard, especially dark ones. The inspiration behind the set came from the designer’s interest in Japanese general Ii Naomasa, who played a crucial role in creating the Samurai code during the feudal era. He was also known for charging into battle with vivid red armor to intimidate his enemies. Sculpted in Cherry profile, GMK Red Samurai is compatible with Cherry MX switches and clones.', 129.99, 610, true);