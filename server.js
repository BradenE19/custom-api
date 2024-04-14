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

// Serve static files from the 'custom-api' directory
app.use(express.static(path.join(__dirname, 'custom-api')));

// Route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to serve the CSS file
app.get('/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'styles.css'));
});

// Route to serve the JavaScript files
app.get('/script.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'script.js'));
});

// Route to serve the gunFilter.js file
app.get('/gunFilter.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'gunFilter.js'));
});

app.get('/populateGunCards.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'populateGunCards.js'));
});

// Route to serve the populateDropdown.js file
app.get('/populateDropdown.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'populateDropdown.js'));
});

app.get('/getSize.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'getSize.js'));
});

app.get('/api/size', (req, res) => {
  const size = ['All', 'Small', 'Medium', 'Large'];
  // Logic to fetch size data from your database and send it as a response
  res.json(size);
});

app.get('/getColors.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'getColors.js'));
});

app.get('/api/colors', (req, res) => {
  // Query the database or fetch colors data from wherever it's stored
  const colors = ['All', 'Red', 'Black', 'Gray', 'Blue', 'Green', 'Pink', 'Yellow', 'Orange', 'Silver', 'White'];

  // Send the colors data as a response
  res.json(colors);
});

app.get('/getType.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'getType.js'));
});

app.get('/api/type', (req, res) => {
  const type = ['All', 'Other', 'Machine Gun', 'Pistol', 'Revolver', 'Rifle', 'Shotgun'];
  // Logic to fetch size data from your database and send it as a response
  res.json(type);
});

app.get('/getAmmo.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'getAmmo.js'));
});

app.get('/api/ammo', (req, res) => {
  const ammo = ['All', 'Buckshot', 'Heavy Bullets', 'Flamer Fuel', 'Ice Crystals', 'Laser Crystals', 'Pellets', 'Photon Chargers', 'Pistol Ammo', 'Plasma Pods', "Revolver Bullets", 'Space Battery', 'The Sun(?)'];
  // Logic to fetch size data from your database and send it as a response
  res.json(ammo);
});

app.get('/getAvailability.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'getAvailability.js'));
});

app.get('/api/availability', (req, res) => {
  const availability = ['All', 'This product is available.', 'This product is not available.'];
  // Logic to fetch size data from your database and send it as a response
  res.json(availability);
});

// Route to fetch gun data with filtering
app.get('/api/guns', (req, res) => {
  const { size, availability, type, ammo, color } = req.query;

  // Build SQL query dynamically based on provided parameters
  let query = 'SELECT * FROM gunstable WHERE 1=1'; // Start with a generic query
  const params = [];

  // Add conditions for filtering based on provided parameters
  if (size && size !== 'All') {
    query += ' AND size = ?';
    params.push(size);
  }
  if (availability && availability !== 'All') {
    query += ' AND availability = ?';
    params.push(availability);
  }
  if (type && type !== 'All') {
    query += ' AND type = ?';
    params.push(type);
  }
  if (ammo && ammo !== 'All') {
    query += ' AND ammo = ?';
    params.push(ammo);
  }
  if (color && color !== 'All') {
    query += ' AND color = ?';
    params.push(color);
  }

  // If no filters are applied, return all guns
  if (params.length === 0) {
    query = 'SELECT * FROM gunstable';
  }

  // Execute the SQL query with the parameters
  connection.query(query, params, (error, results) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
