const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const router = require('./router');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database
connectDB();

// Routes
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
