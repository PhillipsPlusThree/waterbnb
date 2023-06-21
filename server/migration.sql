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
  image VARCHAR 
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
  image VARCHAR
);

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  -- UNIQUE prevents use to have 2 email
  UNIQUE (email) 
);



