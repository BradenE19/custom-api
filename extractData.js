class Logger {
    static log(message) {
        console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
    }

    static warn(message) {
        console.warn(`[WARNING] ${new Date().toISOString()} - ${message}`);
    }

    static error(message) {
        console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
    }
}

const fs = require('fs');
const mysql = require('mysql');

// MySQL database connection configuration
const connection = mysql.createConnection({
    host: 'your_host',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        Logger.error('Error connecting to MySQL: ' + err.message);
        return;
    }
    Logger.log('Connected to MySQL database');
});

const csvFile = 'GunCatalog.csv';

fs.readFile(csvFile, 'utf8', (err, data) => {
    if (err) {
        Logger.error('Error reading the file: ' + err.message);
        return;
    }

    const lines = data.split('\n');
    lines.forEach((line) => {
        const gun = parseCsvLine(line);
        // Insert the data into the MySQL table
        const sql = `INSERT INTO your_table_name (gun_name, gun_img, type, size, colors, price, description, ammo, availability) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        connection.query(sql, gun, (err, result) => {
            if (err) {
                Logger.error('Error inserting data into MySQL: ' + err.message);
                return;
            }
            Logger.log('Data inserted into MySQL: ' + JSON.stringify(result));
        });
    });
});

function parseCsvLine(line) {
    const values = [];
    let current = '';
    let insideQuotes = false;

    for (const char of line) {
        if (char === '"') {
            insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
            values.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }

    values.push(current.trim());
    return values;
}
