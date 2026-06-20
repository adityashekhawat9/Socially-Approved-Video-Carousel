import React, { useState, useCallback, memo } from 'react';
import VideoCard from './VideoCard';
import InnerSlider from './InnerSlider';
import '../styles/components/OuterSlider.css';

/**
 * OuterSlider Component
 * Displays grid of 20-30 videos without performance degradation
 * Optimized with React.memo for efficient rendering
 */
const OuterSlider = memo(({ videos = [], isLoading = false, onVideoUpdate = () => {} }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoClick = useCallback((video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedVideo(null), 300); // Wait for animation
  }, []);

  if (isLoading) {
    return (
      <div className="outer-slider-container">
        <div className="outer-slider-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="video-card skeleton-card">
              <div className="skeleton-thumbnail"></div>
              <div className="skeleton-content">
                <div className="skeleton-line skeleton-title"></div>
                <div className="skeleton-line skeleton-description"></div>
                <div className="skeleton-stats"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="outer-slider-container">
        <div className="empty-state">
          <div className="empty-state-icon">🎬</div>
          <h2>No videos available</h2>
          <p>Check back later for more content</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="outer-slider-container">
        <div className="outer-slider-header">
          <h2>Socially Approved Videos</h2>
          <p className="video-count">{videos.length} videos</p>
        </div>

        <div className="outer-slider-grid">
          {videos.map((video) => (
            <VideoCard
              key={video._id}
              video={video}
              onVideoClick={handleVideoClick}
            />
          ))}
        </div>
      </div>

      {isModalOpen && selectedVideo && (
        <InnerSlider
          videos={videos}
          selectedVideoId={selectedVideo._id}
          onClose={handleCloseModal}
          onVideoUpdate={onVideoUpdate}
        />
      )}
    </>
  );
});

OuterSlider.displayName = 'OuterSlider';

export default OuterSlider;
