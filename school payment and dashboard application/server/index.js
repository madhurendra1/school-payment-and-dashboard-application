const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const db = require('./config/mongoose.js');

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS
const corsOptions = {
  origin: [
    'https://digital-gram-panchayat-services-frontend.vercel.app',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ["Authorization", "Content-Type"],
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', require('./routes'))

// Start the Server
app.listen(PORT, (error) => {
  if (error) {
    console.error('Error starting server:', error);
  } else {
    console.log("Server running on PORT:", PORT);
  }
});