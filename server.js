require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const groceryRoutes = require('./backend/routes/groceries');
const userRoutes = require('./backend/routes/user');

// 
const PORT = process.env.PORT || 4000;

// Creates an express app
const app = express();

// set PORT
app.set('port', (process.env.PORT || 4000));

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/groceries', groceryRoutes);
app.use('/api/user', userRoutes);

// Server static assets if in production
if (process.env.NODE_ENV === 'production')
{
  // Set static folder
  app.use(express.static(path.resolve(__dirname, 'frontend/web/dev')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend/web/dev', 'index.html'));
  });
}

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(PORT || 4000, () => {
      console.log("Connected to db & listening on port", PORT);
    });
  })

  .catch((error) => {
    console.log(error);
  });

