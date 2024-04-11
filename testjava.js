const fs = require('fs');

const csvFile = 'GunCatalog.csv';

fs.readFile(csvFile, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const lines = data.split('\n');
    lines.forEach((line) => {
        const gun = parseCsvLine(line);
        console.log(`{
  'gun_name': '${gun[0]}',
  gun_img: '${gun[1]}',
  type: '${gun[2]}',
  size: '${gun[3]}',
  colors: '${gun[4]}',
  price: '${gun[5]}',
  description: '${gun[6]}',
  ammo: '${gun[7]}',
  availability: '${gun[8]}'
}`);
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

