const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import keys
const db = require('./config/keys').mongoURI;

// Initialize Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Use Routes (You'll define these in your routes folder)
app.use('/api/users', require('./routes/api/users'));
// app.use('/api/products', require('./routes/api/products'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));