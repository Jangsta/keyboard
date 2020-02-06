CREATE DATABASE IF NOT EXISTS keyboard;

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
  payment_types VARCHAR(100), -- list of payment types ex. paypal,google pay,apple pay
  location VARCHAR(50) -- ex. US,EU,SEA
);

DROP TABLE IF EXISTS keysets;
CREATE TABLE keysets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30),
  manufacturer VARCHAR(100), -- gmk, epbt
  material VARCHAR(30), -- expects abs, pbt
  profile VARCHAR(30), -- cherry, kat, dcs
  kits VARCHAR(30),
  tags VARCHAR(500), -- just csv for now
  vendor_id INT,
  image_url VARCHAR(300),
  description VARCHAR(3000),
  price INT,
  quantity INT,
  available BOOLEAN,
  FOREIGN KEY (vendor_id) REFERENCES vendors (id)
);