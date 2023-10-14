const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/products', require('./routes/productRoutes'));
app.use('/auth', require('./routes/authRoutes'));

// Database Connection
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to the database'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
