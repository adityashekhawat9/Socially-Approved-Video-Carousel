import React, { useRef, useState, useCallback, memo } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import VideoCard from './VideoCard';
import InnerSlider from './InnerSlider';
import '../styles/components/OuterSlider.css';

/**
 * OuterSlider Component
 * Displays grid of 20-30 videos without performance degradation
 * Optimized with React.memo for efficient rendering
 */
const OuterSlider = memo(({ videos = [], isLoading = false, onVideoUpdate = () => {} }) => {
  const railRef = useRef(null);
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

  const scrollRail = useCallback((direction) => {
    const rail = railRef.current;
    if (!rail) return;

    const card = rail.querySelector('.video-card');
    const cardWidth = card ? card.getBoundingClientRect().width + 18 : 260;

    rail.scrollBy({
      left: direction * cardWidth * 3,
      behavior: 'smooth',
    });
  }, []);

  if (isLoading) {
    return (
      <div className="outer-slider-container">
        <div className="outer-slider-rail loading">
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
          <p className="outer-slider-eyebrow">Loved by the community</p>
          <h2>Socially Approved</h2>
          <p className="video-count">Watch real short clips from happy customers</p>
          <div className="outer-slider-actions">
            <button
              className="outer-slider-nav"
              type="button"
              onClick={() => scrollRail(-1)}
              title="Scroll left"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              className="outer-slider-nav"
              type="button"
              onClick={() => scrollRail(1)}
              title="Scroll right"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="outer-slider-rail" ref={railRef}>
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
