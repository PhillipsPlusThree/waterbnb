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
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const isValid = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (isValid.rows[0]) {
      throw new Error("User already exists");
    }


    const userData = await db.query(
      "INSERT INTO users(username, password) VALUES ($1, $2) RETURNING *",
      [username, password]
    );

    const token = jwt.sign(userData.rows[0].id, process.env.JWT_TOKEN);

    res.json({
      status: "success",
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message});
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (user.rows.length === 0) {
      return res.status(400).json({ err: 'Invalid username' });
    }

    const isValid = await bcrypt.compare(password, user.rows[0].password);
    console.log(isValid)
    if(!isValid) {
      return res.status(400).json({err: 'Invalid password'});
    }
    const token = jwt.sign(user.rows[0].id, process.env.JWT_TOKEN);
    
    res.json({
      status: "success",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/rentals", (_, res) => {
  db.query("SELECT * FROM rentals").then((data) => {
    // Iterate over the rows and format the date field
    const formattedData = data.rows.map((row) => {
      const dateString = row.date; // Replace 'date' with the actual date field name
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Create a new object with the formatted date
      return {
        ...row,
        date: formattedDate, // Replace 'date' with the actual date field name
      };
    });

    res.json(formattedData);
  });
});

// app.get("/api/rentals", (_, res) => {
//   db.query("SELECT * FROM rentals").then((data) => {
//     res.json(data.rows);
//   });
// });

//Route to get Data from specifc Boat
app.get("/api/rentals/:id", (req, res) => {
  const rentalId = req.params.id;
  db.query("SELECT * FROM rentals WHERE id =$1", [rentalId]).then((data) => {
    res.json(data.rows[0]);
  });
});

app.get("/api/house-boat", (_, res) => {
  const rentalType = "House Boats";
  db.query("SELECT * FROM rentals WHERE type = $1", [rentalType]).then(
    (data) => {
      const formattedData = formatDates(data.rows);
      res.json(formattedData);
    }
  );
});

app.get("/api/yacht", (_, res) => {
  const rentalType = "Yachts";
  db.query("SELECT * FROM rentals WHERE type = $1", [rentalType]).then(
    (data) => {
      const formattedData = formatDates(data.rows);
      res.json(formattedData);
    }
  );
});

app.get("/api/sail-boat", (_, res) => {
  const rentalType = "Sail Boats";
  db.query("SELECT * FROM rentals WHERE type = $1", [rentalType]).then(
    (data) => {
      const formattedData = formatDates(data.rows);
      res.json(formattedData);
    }
  );
});

app.get("/api/fishing-boat", (_, res) => {
  const rentalType = "Fishing Boats";
  db.query("SELECT * FROM rentals WHERE type = $1", [rentalType]).then(
    (data) => {
      const formattedData = formatDates(data.rows);
      res.json(formattedData);
    }
  );
});

app.get("/api/power-boat", (_, res) => {
  const rentalType = "Power Boats";
  db.query("SELECT * FROM rentals WHERE type = $1", [rentalType]).then(
    (data) => {
      const formattedData = formatDates(data.rows);
      res.json(formattedData);
    }
  );
});

app.get("/api/trending", (_, res) => {
  const rentalType = "Trending";
  db.query("SELECT * FROM rentals WHERE type = $1", [rentalType]).then(
    (data) => {
      const formattedData = formatDates(data.rows);
      res.json(formattedData);
    }
  );
});

// Helper function to format dates in the rows
app.post("/api/rentals", (req, res) => {
  let { location, date, group_size } = req.body;

  location = location.charAt(0).toUpperCase() + location.slice(1).toLowerCase();

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
      const formattedData = formatDates(result.rows);
      res.json(formattedData);
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
