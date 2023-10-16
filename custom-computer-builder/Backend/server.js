const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('../Backend/middleware/auth');  // Adjust the path as needed


// Import keys
const db = require('./config/keys').mongoURI;

// Initialize Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Use Routes (You'll define these in your routes folder)
app.use('/api/users', require('./routes/api/users'));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/carts', require('./routes/api/carts'));
app.use('/api/orders', require('./routes/api/orders'));
app.use('/api/builds', require('./routes/api/builds'));



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));