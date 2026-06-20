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
const allowedOrigins = [
  'http://localhost:3000',
  'https://socially-approved-video-carousel-blush.vercel.app',
  'https://socially-approved-v-git-07b009-imadityashekhawat-8952s-projects.vercel.app',
  'https://socially-approved-video-carousel-fmdfko819.vercel.app',
  process.env.CLIENT_URL,
].filter(Boolean);
const isAllowedVercelOrigin = (origin) => {
  try {
    return new URL(origin).hostname.endsWith('.vercel.app');
  } catch (error) {
    return false;
  }
};

// Middleware
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || isAllowedVercelOrigin(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB().then(() => {
  // Routes
  app.use('/api/videos', videoRoutes);
  app.use('/api/like', likeRoutes);
  app.use('/api/share', shareRoutes);
  app.use('/videos', videoRoutes);
  app.use('/like', likeRoutes);
  app.use('/share', shareRoutes);

  // Health check endpoint
  const healthCheck = (req, res) => {
    res.json({ 
      status: 'Server is running', 
      database: 'MongoDB connected',
      timestamp: new Date() 
    });
  };

  app.get('/api/health', healthCheck);
  app.get('/health', healthCheck);

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
