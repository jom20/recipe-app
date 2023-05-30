import express from "express";
import mysql from "mysql";
import cors from "cors";

const port = 8800;

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

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  pool.query('SELECT * FROM login WHERE username = ? AND password = ?', [username, password], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else if (results.length === 0) {
      res.status(401).send('Invalid username or password');
    } else {
      res.sendStatus(200);
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
