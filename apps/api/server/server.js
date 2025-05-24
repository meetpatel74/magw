// server.js - Entry point for MAGW API
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/errorHandler');

// Import routes
const exhibitionRoutes = require('./routes/exhibitions');
const artworkRoutes = require('./routes/artworks');
const authRoutes = require('./routes/auth');


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Base route for API health check
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', message: 'MAGW API is running' });
});

// API routes
app.use('/api/v1/exhibitions', exhibitionRoutes);
app.use('/api/v1/artworks', artworkRoutes);
app.use('/api/v1/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;