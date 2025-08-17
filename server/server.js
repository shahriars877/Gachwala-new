const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
// This is important for Vercel. It allows your frontend to talk to your backend.
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Allow your Vercel frontend URL
  credentials: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));

// This is the crucial change for Vercel
module.exports = app;
