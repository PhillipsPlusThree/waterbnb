import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { hashPasswordMiddleware } from "./auth.js";

dotenv.config({ path: "../.env" });

const PORT = process.env.PORT;
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const app = express();

app.use(express.json());

function formatDates(rows) {
  return rows.map((row) => {
    const dateString = row.date; // Replace 'date' with the actual date field name
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return {
      ...row,
      date: formattedDate, // Replace 'date' with the actual date field name
    };
  });
}

app.get("/api/rentals", (_, res) => {
  db.query("SELECT * FROM rentals")
    .then((data) => {
      // Iterate over the rows and format the date field
      const formattedData = formatDates(data.rows);
      res.json(formattedData);
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
      res.status(500).json({ error: "Failed to retrieve data" });
    });
});

app.get("/api/categories/:type", (req, res) => {
  const type = req.params.type;
  db.query(`SELECT * FROM rentals WHERE type = $1`, [type])
    .then((data) => {
      const formattedData = formatDates(data.rows);
      res.json(formattedData);
    })
    .catch((error) => {
      console.error("Error retrieving type:", error);
      res.status(500).json({ error: "Failed to retrieve type data" });
    });
});

//Route to get Data from specifc Boat
app.get("/api/rentals/:id", (req, res) => {
  const rentalId = Number(req.params.id);
  db.query("SELECT * FROM rentals WHERE id =$1", [rentalId])
    .then((data) => {
      res.json(data.rows[0]);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: error });
    });
});

// Helper function to format dates in the rows
app.post("/api/search", (req, res) => {
  let { location, date, groupSize } = req.body;

  location = location.charAt(0).toUpperCase() + location.slice(1).toLowerCase();

  const query = `
    SELECT * FROM rentals
    WHERE location LIKE $1
    AND date <= $2
    AND group_size >= $3
  `;
  const values = [`%${location}%`, date, groupSize];

  // Execute the database query
  db.query(query, values)
    .then((result) => {
      const formattedData = formatDates(result.rows);
      res.json(formattedData);
      // const filteredResults = result.rows;
      // res.json(filteredResults);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    });
});

app.post("/api/my-rentals", async (req, res) => {
  const { id, location, price, date, group_size, image1 } = req.body;

  const insertQuery = `
    INSERT INTO my_rentals (rental_id, location, price, date, group_size, image1)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [id, location, price, date, group_size, image1];

  const rentalChecked = `
  SELECT * FROM my_rentals
  JOIN rentals ON my_rentals.rental_id = rentals.id
  WHERE my_rentals.rental_id = $1;
`;

  try {
    const checkResult = await db.query(rentalChecked, [id]);
    if (checkResult.rows.length > 0) {
      return res.status(400).json({ error: "Boat already exists" });
    }

    const insertResult = await db.query(insertQuery, values);

    res.json(insertResult.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/api/my-rentals", async (req, res) => {
  try {
    const { rows: likedIds } = await db.query(
      "SELECT * FROM my_rentals JOIN rentals ON my_rentals.rental_id = rentals.id"
    );

    res.json({ likedIds });
  } catch (error) {
    console.error(error);
  }
});

app.delete("/api/my-rentals/:id", (req, res) => {
  const rentalId = Number(req.params.id);

  const query = `
    DELETE FROM my_rentals
    WHERE rental_id = $1 RETURNING *
  `;

  const values = [rentalId];

  // Execute the database query
  db.query(query, values)
    .then((data) => {
      res.status(200).json(data.rows[0]);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    });
});

app.use(hashPasswordMiddleware);

app.get("/api/users", async (req, res) => {
  try {
    const users = await db.query("SELECT * FROM users");
    res.json(users.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, password, and email required" });
    }

    if (password.length < 7) {
      return res
        .status(400)
        .json({ error: "Password must be minimum of 8 characters" });
    }

    if (username.length < 6) {
      return res
        .status(400)
        .json({ error: "Username must be minimum of 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const isValid = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (isValid.rows[0]) {
      throw new Error("User already exists");
    }

    const userData = await db.query(
      "INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, password]
    );

    const token = jwt.sign(userData.rows[0].id, process.env.JWT_TOKEN);

    res.json({
      status: "success",
      token,
      username: userData.rows[0].username,
    });
  } catch (error) {
    // console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(400).json({ err: "Invalid username" });
    }

    const isValid = await bcrypt.compare(password, user.rows[0].password);

    if (!isValid) {
      return res.status(400).json({ err: "Invalid password" });
    }
    const token = jwt.sign(user.rows[0].id, process.env.JWT_TOKEN);

    res.json({
      status: "success",
      token,
      user: user.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
