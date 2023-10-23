require('dotenv').config();

// HTTPS vars
const fs = require('fs');
const https = require('https');
const hostname = 'api-weather.com';
const PORT = 443;

// App setup vars
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes
const groceryRoutes = require('./routes/groceries');
const userRoutes = require('./routes/user');

// Creates an express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/groceries', groceryRoutes);
app.use('/api/user', userRoutes);


// HTTPS Setup
const httpsOptions = {
  cert: fs.readFileSync('./ssl/api-weather_com.crt'),
  ca: fs.readFileSync('./ssl/api-weather_com.ca-bundle'),
  key: fs.readFileSync('./ssl/api-weather_com.key')
};

// Create server
const httpsServer = https.createServer(httpsOptions, app);

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    httpsServer.listen(PORT, hostname, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })

  .catch((error) => {
    console.log(error);
  });

