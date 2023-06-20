import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const PORT = process.env.PORT;
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const app = express();

app.use(express.json());

app.get("/api/rentals", (_, res) => {
  db.query("SELECT * FROM rentals").then((data) => {
    res.json(data.rows);
  });
});

//Route to get Data from specifc Boat
app.get("/api/rentals/:id", (req, res) => {
  const rentalId = req.params.id;
  db.query("SELECT * FROM rentals WHERE id =$1", [rentalId]).then((data) => {
    res.json(data.rows[0]);
  });
});

app.get("/api/my-rentals", (_, res) => {
  db.query("SELECT * FROM my_rentals").then((data) => {
    res.json(data.rows);
  });
});

app.post("/api/rentals", (req, res) => {
  const { location, date, group_size } = req.body;

  const query = `
    SELECT * FROM rentals
    WHERE location LIKE $1
    AND date <= $2
    AND group_size >= $3
  `;

  const values = [`%${location}%`, date, group_size];

  // Execute the database query
  db.query(query, values)
    .then((result) => {
      console.log("Search query:", query, values);
      console.log("Search results:", result.rows);
      const filteredResults = result.rows;
      res.json(filteredResults);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    });
});

app.post("/api/my-rentals", (req, res) => {
  const { id, location, price, date, group_size, image } = req.body;

  const insertQuery = `
    INSERT INTO my_rentals (rental_id, location, price, date, group_size, image)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [id, location, price, date, group_size, image];

  // Execute the database query
  db.query(insertQuery, values)
    .then((result) => {
      console.log("Inserted rental:", result.rows[0]); // Console log added here
      res.json(result.rows[0]);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    });
});

app.delete("/api/my-rentals/:id", (req, res) => {
  const rentalId = req.params.id;

  const query = `
    DELETE FROM my_rentals
    WHERE id = $1
  `;

  const values = [rentalId];

  // Execute the database query
  db.query(query, values)
    .then(() => {
      console.log(`Deleted rental with ID ${rentalId} from my_rentals`);
      res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
