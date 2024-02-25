const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('./middleware/auth');

// Import keys
const db = require('./config/keys').mongoURI;

// Initialize Express
const app = express();

// Middleware
app.use(bodyParser.json());

const allowedOrigins = ['https://custompc-backend.fly.dev', 'http://localhost:3000', 'https://green-customs.netlify.app']; 
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.use(passport.initialize());

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/carts', require('./routes/api/carts'));
app.use('/api/orders', require('./routes/api/orders'));
app.use('/api/builds', require('./routes/api/builds'));

const port = process.env.PORT || 3000;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});