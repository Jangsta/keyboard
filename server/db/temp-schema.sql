USE keyboard;

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
  payment_types VARCHAR(100), --list of payment types ex. paypal,google pay,apple pay
  location VARCHAR(50) -- ex. US,EU,SEA
);

-- DROP TABLE IF EXISTS product_types;

-- CREATE TABLE product_types (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(50) NOT NULL
-- );

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tags VARCHAR(500), -- just csv for now
  name VARCHAR(30),
  vendor_id INT,
  description VARCHAR(3000),
  price INT,
  quantity INT,
  available BOOLEAN,

  FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

DROP TABLE IF EXISTS images;

CREATE TABLE images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  comment VARCHAR(3000),
  url VARCHAR(300),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

DROP TABLE IF EXISTS colors;

CREATE TABLE colors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  color_name VARCHAR(30),
  color_code VARCHAR(30)
);

DROP TABLE IF EXISTS product_colors;
CREATE TABLE product_colors (
  color_id INT NOT NULL,
  product_id INT NOT NULL,
  color_name VARCHAR(30),
  price DECIMAL(8,2),
  FOREIGN KEY (color_id) REFERENCES colors (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE RESTRICT ON UPDATE CASCADE
);

DROP TABLE IF EXISTS keyboards;

CREATE TABLE keyboards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  creator VARCHAR(50), -- designer name, example: Zambumon
  mount_style VARCHAR(100), -- expects top-mount, gasket-mount, etc.
  hotswap BOOLEAN, -- hotswap or soldered
  layout VARCHAR(100), -- example: ortholinear, ergonomic, alice, split
  size INT, -- expects 60, 65, 75, etc.
  weight DECIMAL(8,2), -- weight in lbs
  rgb VARCHAR(30), -- expects per-key, underglow, none, etc.
  plate_type VARCHAR(30), -- expects full, half, noplate
  plate_material VARCHAR(30), -- expects aluminum, brass, carbon fiber, fre4, polycarbonate, acrylic, etc.
  angle DECIMAL(10,2), --in degrees, example: 6.5 (° implied)
  build_options VARCHAR(30), -- expects kit, prebuilt
  programmability VARCHAR(30), -- expects fully programmable
  switch_compatability VARCHAR(30), -- expects mx, alps
  dimensions VARCHAR(200), -- expects string 100cmx100cmx100cm
  first_appearance DATE,
  connector VARCHAR(20),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

DROP TABLE IF EXISTS keysets;
CREATE TABLE keysets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  manufacturer VARCHAR(100), -- gmk, epbt
  material VARCHAR(30), --expects abs, pbt
  profile VARCHAR(30), -- cherry, kat, dcs
);

DROP TABLE IF EXISTS group_buys;

-- 99.5th% confidence interval: 218 characters per url

DROP TABLE IF EXISTS group_buys;

CREATE TABLE group_buys (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  vendor_id INT,
  start_date DATE,
  end_date DATE,
  price DECIMAL(8,2),
  geekhack_url VARCHAR(300),
  reddit_url VARCHAR(300),
  vendor_url VARCHAR(300),
  other_urls_id INT,
  -- FOREIGN KEY (vendor_id) REFERENCES vendors (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  -- FOREIGN KEY (other_urls_id) REFERENCES urls (id) ON DELETE RESTRICT ON UPDATE CASCADE,
);
