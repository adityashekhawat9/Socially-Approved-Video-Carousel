const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const Share = require('../models/Share');

// Helper function to get user IP
const getUserIP = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.socket.remoteAddress ||
    'unknown';
};

// POST /api/share - Track video share
router.post('/', async (req, res) => {
  try {
    const { videoId, platform } = req.body;

    // Validate input
    if (!videoId) {
      return res.status(400).json({
        error: 'videoId is required'
      });
    }

    const validPlatforms = ['facebook', 'twitter', 'linkedin', 'whatsapp', 'copy_link', 'email'];
    const sharePlatform = platform || 'copy_link';

    if (!validPlatforms.includes(sharePlatform)) {
      return res.status(400).json({
        error: `Invalid platform. Valid platforms: ${validPlatforms.join(', ')}`
      });
    }

    // Check if video exists
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        error: 'Video not found'
      });
    }

    const userIP = getUserIP(req);
    const timestamp = new Date();

    // Create share record
    const newShare = new Share({
      videoId: videoId,
      platform: sharePlatform,
      userIP: userIP,
      timestamp: timestamp
    });

    await newShare.save();

    // Update video share count
    video.shares = (video.shares || 0) + 1;
    await video.save();

    res.status(200).json({
      success: true,
      message: 'Share tracked successfully',
      videoId: videoId,
      platform: sharePlatform,
      shareCount: video.shares,
      timestamp: timestamp
    });
  } catch (error) {
    console.error('Error processing share:', error);
    res.status(500).json({
      error: 'Failed to process share',
      message: error.message
    });
  }
});

// GET /api/share/:videoId - Get share count and statistics for a video
router.get('/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        error: 'Video not found'
      });
    }

    // Get share statistics
    const shares = await Share.find({ videoId: videoId });

    // Count by platform
    const sharesByPlatform = {};
    shares.forEach(share => {
      sharesByPlatform[share.platform] = (sharesByPlatform[share.platform] || 0) + 1;
    });

    res.status(200).json({
      success: true,
      videoId: videoId,
      totalShares: video.shares,
      sharesByPlatform: sharesByPlatform
    });
  } catch (error) {
    console.error('Error fetching share count:', error);
    res.status(500).json({
      error: 'Failed to fetch share count',
      message: error.message
    });
  }
});

module.exports = router;
