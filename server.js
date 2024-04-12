const express = require('express');
const app = express();
const path = require('path');

// Configure Express to serve static files from the 'custom-api' directory
app.use(express.static(path.join(__dirname)));

// Define a route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
