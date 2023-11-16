require('dotenv').config();

const PORT = 4000;

// App setup vars
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes
const userRoutes = require('./routes/user');
const storeRoutes = require('./routes/stores');
const itemRoutes = require('./routes/items');
const eatRoutes = require('./routes/eats');

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
app.use('/api/user', userRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/eats', eatRoutes);

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })

  .catch((error) => {
    console.log(error);
  });

