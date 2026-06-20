import React, { memo, useState } from 'react';
import '../styles/components/VideoCard.css';

const FALLBACK_THUMBNAIL = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="300" height="168" viewBox="0 0 300 168">
    <rect width="300" height="168" fill="#111827"/>
    <circle cx="150" cy="72" r="28" fill="rgba(255,255,255,.18)"/>
    <polygon points="142,58 142,86 166,72" fill="white"/>
    <text x="150" y="126" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="white">Video Preview</text>
  </svg>
`)}`;

/**
 * VideoCard Component
 * Displays individual video with thumbnail and metadata
 */
const VideoCard = memo(({ video, onVideoClick, isLoading = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="video-card" onClick={() => onVideoClick(video)}>
      <div className="video-card-thumbnail-container">
        {!imageLoaded && !imageError && (
          <div className="video-card-skeleton"></div>
        )}

        <img
          src={imageError ? FALLBACK_THUMBNAIL : video.thumbnail}
          alt={video.title}
          className={`video-card-thumbnail ${imageLoaded ? 'loaded' : ''}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
          decoding="async"
        />

        <div className="video-card-overlay">
          <button className="play-button" aria-label="Play video">
            ▶
          </button>
        </div>

        {video.duration && (
          <span className="video-duration">{formatDuration(video.duration)}</span>
        )}
      </div>

      <div className="video-card-content">
        <h3 className="video-card-title">{video.title}</h3>

        <p className="video-card-description">
          {(video.description || '').substring(0, 80)}
          {(video.description || '').length > 80 ? '...' : ''}
        </p>

        <div className="video-card-creator">
          <span className="creator-name">{video.creator}</span>
        </div>

        <div className="video-card-stats">
          <span className="stat">
            <span className="stat-icon">❤️</span>
            {formatNumber(video.likes)}
          </span>
          <span className="stat">
            <span className="stat-icon">👁️</span>
            {formatNumber(video.views || 0)}
          </span>
          <span className="stat">
            <span className="stat-icon">📤</span>
            {formatNumber(video.shares)}
          </span>
        </div>
      </div>
    </div>
  );
});

VideoCard.displayName = 'VideoCard';

export default VideoCard;
