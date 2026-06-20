const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const Like = require('../models/Like');

// Helper function to get user IP
const getUserIP = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.socket.remoteAddress ||
    'unknown';
};

// POST /api/like - Like a video
router.post('/', async (req, res) => {
  try {
    const { videoId } = req.body;

    if (!videoId) {
      return res.status(400).json({
        error: 'videoId is required'
      });
    }

    const userIP = getUserIP(req);
    const timestamp = new Date();

    // Check if video exists
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        error: 'Video not found'
      });
    }

    // Check if user already liked this video
    const existingLike = await Like.findOne({
      videoId: videoId,
      userIP: userIP
    });

    if (existingLike) {
      // User already liked this video, remove the like
      await Like.deleteOne({ _id: existingLike._id });
      video.likes = Math.max(0, video.likes - 1);
      await video.save();

      return res.status(200).json({
        success: true,
        message: 'Like removed',
        liked: false,
        videoId: videoId,
        likeCount: video.likes
      });
    }

    // Add new like
    const newLike = new Like({
      videoId: videoId,
      userIP: userIP,
      timestamp: timestamp
    });

    await newLike.save();
    video.likes = (video.likes || 0) + 1;
    await video.save();

    res.status(200).json({
      success: true,
      message: 'Video liked successfully',
      liked: true,
      videoId: videoId,
      likeCount: video.likes
    });
  } catch (error) {
    console.error('Error processing like:', error);
    res.status(500).json({
      error: 'Failed to process like',
      message: error.message
    });
  }
});

// GET /api/like/:videoId - Get like count for a video
router.get('/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        error: 'Video not found'
      });
    }

    res.status(200).json({
      success: true,
      videoId: videoId,
      likeCount: video.likes
    });
  } catch (error) {
    console.error('Error fetching like count:', error);
    res.status(500).json({
      error: 'Failed to fetch like count',
      message: error.message
    });
  }
});

module.exports = router;
