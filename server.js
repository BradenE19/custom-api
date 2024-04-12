const express = require('express');
const mysql = require('mysql');

const app = express();

// MySQL database connection configuration
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Cowboys1&',
    database: 'galacticmarketdatabase'
});

// Connect to MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Define a route to fetch all space guns from the database
app.get('/guns', (req, res) => {
    const query = 'SELECT * FROM gunstable';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching space guns:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

// Define a route to search for guns based on specific criteria
app.get('/search', (req, res) => {
    const { q } = req.query; // Get the search query from the request URL query parameters
    // Construct a SQL query to search for guns based on the provided criteria
    const query = `SELECT * FROM gunstable WHERE gun_name LIKE '%${q}%' OR type LIKE '%${q}%' OR size LIKE '%${q}%' OR colors LIKE '%${q}%' OR description LIKE '%${q}%' OR ammo LIKE '%${q}%' OR availability LIKE '%${q}%'`;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error searching for space guns:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
