const fs = require('fs');

const csvFile = 'GunCatalog.csv';

fs.readFile(csvFile, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const lines = data.split('\n');
    lines.forEach((line) => {
        const gun = line.split(',');
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
