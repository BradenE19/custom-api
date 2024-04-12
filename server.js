const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// MySQL database connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Cowboys1&',
  database: 'galacticmarketdatabase'
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Define the '/api/guns' endpoint
app.get('/api/guns', (req, res) => {
  // Query the database to fetch gun data
  const query = 'SELECT * FROM gunstable';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

// Define route handler for the root URL
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  console.log('Index file path:', indexPath);
  res.sendFile(indexPath);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
