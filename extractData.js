const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql');

// Logger class for logging events
class Logger {
    static log(message) {
        console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
    }

    static error(message) {
        console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
    }
}

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
  
  // Read the CSV file and insert data into MySQL database
  fs.createReadStream('GunCatalog.csv')
    .pipe(csv())
    .on('data', (row) => {
      const { gun_name, gun_img, type, size, colors, price, description, ammo, availability } = row;
      const sql = `INSERT INTO gunstable (gun_name, gun_img, type, size, colors, price, description, ammo, availability) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      connection.query(sql, [gun_name, gun_img, type, size, colors, price, description, ammo, availability], (err, result) => {
        if (err) {
          console.error('Error inserting data into MySQL:', err);
          return;
        }
        console.log('Data inserted into MySQL:', result);
      });
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      // Close MySQL connection
      connection.end();
    });