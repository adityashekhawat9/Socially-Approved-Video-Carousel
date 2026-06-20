const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default: null,
    },
    duration: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    shares: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        userId: String,
        text: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    creator: {
      type: String,
      default: 'Anonymous',
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Video', videoSchema);
