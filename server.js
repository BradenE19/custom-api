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

app.use(express.static('custom-api'));

// Specify the directory where your static files are located
const staticFilesDirectory = path.join(__dirname, 'custom-api');

// Serve static files from the specified directory
app.use(express.static(staticFilesDirectory));

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

// Define route handler for serving CSS file
app.get('/styles.css', (req, res) => {
  const stylesPath = path.join(__dirname, 'styles.css');
  console.log('Stylesheet file path:', stylesPath);
  res.sendFile(stylesPath);
});

// Define route handler for serving JavaScript file
app.get('/script.js', (req, res) => {
  const scriptPath = path.join(__dirname, 'script.js');
  console.log('JavaScript file path:', scriptPath);
  res.sendFile(scriptPath);
});

// Define route handler for serving getColors.js file
app.get('/getColors.js', (req, res) => {
  const getColorsPath = path.join(__dirname, 'getColors.js');
  console.log('getColors file path:', getColorsPath);
  res.set('Content-Type', 'application/javascript'); // Set the Content-Type header
  res.sendFile(getColorsPath);
});

app.get('/getType.js', (req, res) => {
  const getTypePath = path.join(__dirname, 'getType.js');
  console.log('getType file path:', getTypePath);
  res.sendFile(getTypePath);
});

app.get('/getAmmo.js', (req, res) => {
  const getAmmoPath = path.join(__dirname, 'getAmmo.js');
  console.log('getAmmo file path:', getAmmoPath);
  res.sendFile(getAmmoPath);
});

app.get('/getAvailability.js', (req, res) => {
  const getAvailabilityPath = path.join(__dirname, 'getAvailability.js');
  console.log('getAvailability file path:', getAvailabilityPath);
  res.sendFile(getAvailabilityPath);
});

app.get('/getColors.js', (req, res) => {
  const getColorsPath = path.join(__dirname, 'getColors.js');
  console.log('getColors file path:', getColorsPath);
  res.set('Content-Type', 'application/javascript'); // Set the Content-Type header
  res.sendFile(getColorsPath);
});






app.get('/api/colors', (req, res) => {
  // Query the database or fetch colors data from wherever it's stored
  const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Silver']; // Example colors data
  // Send the colors data as a response
  res.json(colors);
});

app.get('/api/sizes', (req, res) => {
  const sizes = ['Small', 'Medium', 'Large'];
  // Logic to fetch size data from your database and send it as a response
  res.json(sizes);
});

app.get('/api/availability', (req, res) => {
  const availability = ['This product is available.', 'This product is not available.'];
  // Logic to fetch size data from your database and send it as a response
  res.json(availability);
});

app.get('/api/ammo', (req, res) => {
  const ammo = ['Buckshot', 'Heavy Bullets', 'Flamer Fuel', 'Ice Crystals', 'Laser Crystals', 'Pellets', 'Photon Chargers', 'Pistol Ammo', 'Plasma Pods', "Revolver Bullets", 'Space Battery', 'The Sun(?)'];
  // Logic to fetch size data from your database and send it as a response
  res.json(ammo);
});





app.get('/populateGunCards.js', (req, res) => {
  const populateGunCardsPath = path.join(__dirname, 'populateGunCards.js');
  console.log('populateGunCards.js file path:', populateGunCardsPath);
  res.sendFile(populateGunCardsPath);
});



// Serve static files with custom headers
app.use(express.static('custom-api', {
  setHeaders: (res, filePath) => {
      if (filePath.endsWith('.css')) {
          res.setHeader('Content-Type', 'text/css');
      } else if (filePath.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript');
      }
  }
}));


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
