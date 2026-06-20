const mongoose = require('mongoose');

const shareSchema = new mongoose.Schema(
  {
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      required: true,
    },
    platform: {
      type: String,
      enum: ['facebook', 'twitter', 'linkedin', 'whatsapp', 'copy_link', 'email'],
      default: 'copy_link',
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

module.exports = mongoose.model('Share', shareSchema);
