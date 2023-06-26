DROP TABLE IF EXISTS my_rentals;
DROP TABLE IF EXISTS rentals;
DROP TABLE IF EXISTS users;

CREATE TABLE rentals (
  id SERIAL PRIMARY KEY,
  location TEXT NOT NULL,
  price INTEGER,
  date DATE,
  group_size INTEGER,
  type TEXT,
  rating DECIMAL (2,1),
  review INTEGER,
  description TEXT,
  image1 VARCHAR, 
  image2 VARCHAR,
  image3 VARCHAR,
  image4 VARCHAR,
  image5 VARCHAR 
);

CREATE TABLE my_rentals (
  id SERIAL PRIMARY KEY,
  rental_id INTEGER REFERENCES rentals(id),
  location TEXT NOT NULL,
  price INTEGER NOT NULL,
  date DATE,
  group_size INTEGER,
  type TEXT,
  rating DECIMAL (2,1),
  review INTEGER,
  description TEXT,
  image1 VARCHAR,
  image2 VARCHAR,
  image3 VARCHAR,
  image4 VARCHAR,
  image5 VARCHAR 
);

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  username VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL
);



