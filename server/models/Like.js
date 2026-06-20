const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
  {
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      required: true,
    },
    userIP: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      default: null,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create unique index to prevent duplicate likes from same user
likeSchema.index({ videoId: 1, userIP: 1 }, { unique: true });

module.exports = mongoose.model('Like', likeSchema);
