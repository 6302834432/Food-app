const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const { dbconnect } = require('../src/config/databaseconfig');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000'],
}));

// Connect to the database
dbconnect();

// Serve static files from the frontend build directory
const publicFolder = path.join(__dirname, 'public');
app.use(express.static(publicFolder));

// API Routes
app.use('/api/foods', require('./Routes/Food_router'));
app.use('/api/users', require('./Routes/UserRouter'));
app.use('/api/orders', require('./Routes/OrderRouter'));
app.use('/api/test', require('./Routes/testRoute'));

// Catch-all route to serve the frontend's index.html
app.get('*', (req, res) => {
  const indexFilePath = path.join(publicFolder, 'index.html');
  res.sendFile(indexFilePath);
});

// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Server is running on port', PORT);
  }
});
