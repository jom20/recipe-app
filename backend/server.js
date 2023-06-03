import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt";

const port = 8800;
const saltRounds = 10;

const app = express();

// Create a MySQL connection pool
const pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbrecipe",
});

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS
app.use(cors());

// Fetch recipes from the database
app.get('/api/recipes', (req, res) => {
  pool.query('SELECT * FROM recipes', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

app.post("/api/signup", (req, res) => {
  const { name, username, password } = req.body;

  bcrypt.hash(password, saltRounds, (hashErr, hashedPassword) => {
    if (hashErr) {
      console.error(hashErr);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const insertQuery = "INSERT INTO login (name, username, password) VALUES (?, ?, ?)";
    pool.query(insertQuery, [name, username, hashedPassword], (insertErr, insertResult) => {
      if (insertErr) {
        console.log(insertErr);
        return res.status(500).json({ error: 'Internal server error' });
      }
      return res.status(200).json({ message: 'User registered successfully' });
    });
  });
});



app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  pool.query('SELECT * FROM login WHERE username = ?', [username], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else if (results.length === 0) {
      res.status(401).send('Invalid username or password');
    } else {
      const storedPassword = results[0].password;
      bcrypt.compare(password, storedPassword, (compareErr, isMatch) => {
        if (compareErr) {
          console.error(compareErr);
          res.status(500).send('Internal Server Error');
        } else if (isMatch) {
          res.sendStatus(200);
        } else {
          res.status(401).send('Invalid username or password');
        }
      });
    }
  });
});

// Fetch recipe details from the database
app.get('/api/recipes/:id', (req, res) => {
  const recipeId = req.params.id;
  pool.query('SELECT * FROM recipes WHERE id = ?', [recipeId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else if (results.length === 0) {
      res.status(404).send('Recipe not found');
    } else {
      res.json(results[0]);
    }
  });
});

// Add a new recipe to the database
app.post('/api/recipes', (req, res) => {
  const { title, image, description } = req.body;

  pool.query('INSERT INTO recipes (title, image, description) VALUES (?, ?, ?)', [title, image, description], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.sendStatus(201);
    }
  });
});
// Update a recipe in the database
app.put('/api/recipes/:id', (req, res) => {
  const recipeId = req.params.id;
  const { title, image, description } = req.body;

  pool.query(
    'UPDATE recipes SET title = ?, image = ?, description = ? WHERE id = ?',
    [title, image, description, recipeId],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// Fetch comments for a recipe
app.get('/api/recipes/:id/comments', (req, res) => {
  const recipeId = req.params.id;

  pool.query('SELECT * FROM comments WHERE recipe_id = ?', [recipeId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

// Add a new comment to a recipe
app.post('/api/recipes/:id/comments', (req, res) => {
  const recipeId = req.params.id;
  const { comment } = req.body;

  pool.query('INSERT INTO comments (recipe_id, comment) VALUES (?, ?)', [recipeId, comment], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      // Return the newly added comment
      const commentId = results.insertId;
      pool.query('SELECT * FROM comments WHERE id = ?', [commentId], (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        } else if (results.length === 0) {
          res.status(404).send('Comment not found');
        } else {
          res.json(results[0]);
        }
      });
    }
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
