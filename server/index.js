const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// Import database connection
const { connectDB } = require('./config/db');

// Import routes
const videoRoutes = require('./routes/videos');
const likeRoutes = require('./routes/likes');
const shareRoutes = require('./routes/shares');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB().then(() => {
  // Routes
  app.use('/api/videos', videoRoutes);
  app.use('/api/like', likeRoutes);
  app.use('/api/share', shareRoutes);

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'Server is running', 
      database: 'MongoDB connected',
      timestamp: new Date() 
    });
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`✓ Server is running on http://localhost:${PORT}`);
    console.log(`✓ API Base URL: http://localhost:${PORT}/api`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  });
}).catch((error) => {
  console.error('Failed to connect to database. Server not started.');
  process.exit(1);
});

