import { faker } from "@faker-js/faker";
import postgres from "postgres";
import fs from "fs";

const sql = postgres("http://localhost:5173/");
const writableStream = fs.createWriteStream("data.csv");



for (let i = 0; i < 1_000; i++){
const location = faker.location.city();
const price = faker.number.int({ min: 100, max: 400 });
const date = "2023-07-15";
const groupSize = faker.number.int({ min: 2, max: 50 });
const rating = faker.number.int({ min: 1, max: 5 });
const review = faker.number.int({ min: 1, max: 100 });
const description = faker.lorem.paragraph({ min: 3, max: 10 });
const image1 = faker.image.url({width: 200, height: 200});
const image2 = faker.image.url({width: 200, height: 200});
const image3 = faker.image.url({width: 200, height: 200});
const image4 = faker.image.url({width: 200, height: 200});
const image5 = faker.image.url({width: 200, height: 200});

writableStream.write(`${location}, ${price}, ${date}, ${groupSize}, ${rating}, ${review}, ${description}, ${image1}, ${image2}, ${image3}, ${image4}, ${image5}\n`);
};

writableStream.close();
sql.end();

// \copy rentals (location, price, date, group_size, rating, review, description, image1, image2, image3, image4, image5) FROM 'C:\Users\brook\Code\projects\waterbnb\data.csv' WITH DELIMITER ',' CSV;