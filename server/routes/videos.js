const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const dummyVideos = require('../data/videos.json');

const ensureDummyVideos = async () => {
  const count = await Video.countDocuments();
  if (count > 0) return;

  const videos = (dummyVideos.videos || []).map(({ id, ...video }) => video);
  if (videos.length > 0) {
    await Video.insertMany(videos);
  }
};

// GET /api/videos - Fetch all videos with metadata
router.get('/', async (req, res) => {
  try {
    await ensureDummyVideos();
    const videos = await Video.find({}).select('-comments');

    if (!videos || videos.length === 0) {
      return res.status(404).json({
        error: 'No videos found',
        videos: []
      });
    }

    res.status(200).json({
      success: true,
      count: videos.length,
      videos: videos
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({
      error: 'Failed to fetch videos',
      message: error.message
    });
  }
});

// GET /api/videos/paginated - Fetch videos with pagination
router.get('/paginated', async (req, res) => {
  try {
    await ensureDummyVideos();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const total = await Video.countDocuments();

    const videos = await Video.find({})
      .select('-comments')
      .skip(skip)
      .limit(limit)
      .sort({ uploadedAt: -1 });

    res.status(200).json({
      success: true,
      page: page,
      limit: limit,
      total: total,
      totalPages: Math.ceil(total / limit),
      videos: videos
    });
  } catch (error) {
    console.error('Error fetching paginated videos:', error);
    res.status(500).json({
      error: 'Failed to fetch videos',
      message: error.message
    });
  }
});

// GET /api/videos/:id - Fetch single video by ID
router.get('/:id', async (req, res) => {
  try {
    await ensureDummyVideos();
    const { id } = req.params;

    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({
        error: 'Video not found'
      });
    }

    res.status(200).json({
      success: true,
      video: video
    });
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({
      error: 'Failed to fetch video',
      message: error.message
    });
  }
});

module.exports = router;
