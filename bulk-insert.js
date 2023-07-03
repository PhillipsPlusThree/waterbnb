import { faker } from "@faker-js/faker";
import postgres from "postgres";
import fs from "fs";

const sql = postgres("postgres://phillip:Zdrfvcxz.;5@localhost/waterbnb");
const writableStream = fs.createWriteStream("data.csv");

await sql`DELETE FROM rentals`;

for (let i = 0; i < 10000; i++) {
  const location = "Naples, Florida";
  const price = 500;
  const date = "2023-06-22";
  const group_size = 3;
  const type = "yacht";
  const rating = 4.8;
  const description =
    "Experience the ultimate floating retreat with breathtaking views and luxurious amenities";
  const image1 = faker.image.urlPicsumPhotos({ height: 200 });
  const image2 = faker.image.urlPicsumPhotos({ height: 200 });
  const image3 = faker.image.urlPicsumPhotos({ height: 200 });
  const image4 = faker.image.urlPicsumPhotos({ height: 200 });
  const image5 = faker.image.urlPicsumPhotos({ height: 200 });

  await sql`
  INSERT INTO rentals (location, price, date, group_size, type, rating, description, image1, image2, image3, image4, image5)
  VALUES (${location}, ${price}, ${date}, ${group_size}, ${type}, ${rating}, ${description}, ${image1}, ${image2}, ${image3}, ${image4}, ${image5});
`;

  // writableStream.write(
  //   `${location}, ${price}, ${date}, ${group_size}, ${type}, ${rating}, ${description}, ${image1}, ${image2}, ${image3}, ${image4}, ${image5}\n`
  // );

  // await sql`COPY rentals (location, price, date, group_size, type, rating, description, image1, image2, image3, image4, image5) FROM '/home/phillip/code/week 13/waterbnb_personal/data.csv' WITH DELIMITER ',' CSV`;
}

writableStream.close();
sql.end();

// CREATE TABLE rentals (
//   id SERIAL PRIMARY KEY,
//   location TEXT NOT NULL,
//   price INTEGER,
//   date DATE,
//   group_size INTEGER,
//   type TEXT,
//   rating DECIMAL (2,1),
//   review INTEGER,
//   description TEXT,
//   image1 VARCHAR,
//   image2 VARCHAR,
//   image3 VARCHAR,
//   image4 VARCHAR,
//   image5 VARCHAR
// );
