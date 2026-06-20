import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import VideoPlayer from './VideoPlayer';
import LikeButton from './LikeButton';
import ShareButton from './ShareButton';
import '../styles/components/InnerSlider.css';

/**
 * InnerSlider Component (Modal)
 * Displays 3 videos at a time with horizontal scrolling and swipe support
 */
const InnerSlider = memo(({
  videos = [],
  selectedVideoId,
  onClose = () => {},
  onVideoUpdate = () => {},
}) => {
  const sliderRef = useRef(null);
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);
  const scrollFrameRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = useCallback((index, behavior = 'smooth') => {
    const slider = sliderRef.current;
    if (!slider) return;

    const firstCard = slider.querySelector('.inner-slider-card-wrapper');
    if (!firstCard) return;

    const cardGap = parseFloat(window.getComputedStyle(slider).columnGap || 0);
    const cardWidth = firstCard.getBoundingClientRect().width + cardGap;

    slider.scrollTo({
      left: index * cardWidth,
      behavior,
    });
  }, []);

  // Find initial index
  useEffect(() => {
    const index = videos.findIndex(v => v._id === selectedVideoId);
    if (index !== -1) {
      setCurrentIndex(index);
      setTimeout(() => scrollToIndex(index, 'auto'), 0);
    }
  }, [selectedVideoId, videos, scrollToIndex]);

  useEffect(() => {
    scrollToIndex(currentIndex);
  }, [currentIndex, scrollToIndex]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + videos.length) % videos.length);
  }, [videos.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % videos.length);
  }, [videos.length]);

  const handleScroll = useCallback(() => {
    if (scrollFrameRef.current) return;

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      scrollFrameRef.current = null;

    const slider = sliderRef.current;
    if (!slider) return;

    const firstCard = slider.querySelector('.inner-slider-card-wrapper');
    if (!firstCard) return;

    const cardGap = parseFloat(window.getComputedStyle(slider).columnGap || 0);
    const cardWidth = firstCard.getBoundingClientRect().width + cardGap;
    if (!cardWidth) return;

    const nextIndex = Math.min(
      videos.length - 1,
      Math.max(0, Math.round(slider.scrollLeft / cardWidth))
    );

    setCurrentIndex((previousIndex) => (
      previousIndex === nextIndex ? previousIndex : nextIndex
    ));
    });
  }, [videos.length]);

  const handleLikeChange = useCallback((videoId, likeCount) => {
    onVideoUpdate(videoId, { likes: likeCount });
  }, [onVideoUpdate]);

  const handleShareSuccess = useCallback((videoId, shareCount) => {
    if (typeof shareCount === 'number') {
      onVideoUpdate(videoId, { shares: shareCount });
    }
  }, [onVideoUpdate]);

  const shouldLoadVideo = useCallback((index) => {
    return Math.abs(index - currentIndex) <= 1;
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handlePrevious, handleNext, onClose]);

  useEffect(() => {
    return () => {
      if (scrollFrameRef.current) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  // Swipe handling
  const handleTouchStart = (e) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndRef.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const difference = touchStartRef.current - touchEndRef.current;
    const isLeftSwipe = difference > 50;
    const isRightSwipe = difference < -50;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrevious();
    }
  };

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <div className="inner-slider-modal-overlay" onClick={onClose}>
      <div
        className="inner-slider-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="inner-slider-close-btn"
          onClick={onClose}
          title="Close (ESC)"
        >
          <FiX size={24} />
        </button>

        {/* Video Count */}
        <div className="video-counter">
          {currentIndex + 1} / {videos.length}
        </div>

        {/* Carousel Container */}
        <div className="inner-slider-container">
          {/* Previous Button */}
          <button
            className="inner-slider-nav-btn prev"
            onClick={handlePrevious}
            title="Previous (←)"
          >
            <FiChevronLeft size={32} />
          </button>

          {/* Videos Carousel */}
          <div
            className="inner-slider-carousel"
            ref={sliderRef}
            onScroll={handleScroll}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {videos.map((video, index) => {
              const isActive = index === currentIndex;
              const isLoaded = shouldLoadVideo(index);

              return (
              <div key={video._id} className="inner-slider-card-wrapper">
                <article className={`inner-video-card ${isActive ? 'active' : ''}`}>
                  {isLoaded ? (
                    <VideoPlayer
                      videoUrl={video.url}
                      videoTitle={video.title}
                      poster={video.thumbnail}
                      active={isActive}
                      shouldLoad={isLoaded}
                      autoPlay={isActive}
                    />
                  ) : (
                    <button
                      type="button"
                      className="inner-video-placeholder"
                      onClick={() => setCurrentIndex(index)}
                      title={`Open ${video.title}`}
                    >
                      <img src={video.thumbnail} alt={video.title} loading="lazy" />
                      <span>Play</span>
                    </button>
                  )}

                  <div className={`inner-video-details ${isLoaded ? '' : 'compact'}`}>
                    <div className="inner-video-copy">
                      <h3>{video.title}</h3>
                      {isLoaded && <p>{video.description}</p>}
                      <span>{video.creator}</span>
                    </div>

                    {isLoaded && (
                      <div className="inner-video-actions">
                      <LikeButton
                        videoId={video._id}
                        initialLikes={video.likes || 0}
                        onLikeChange={(likeCount) => handleLikeChange(video._id, likeCount)}
                      />
                      <ShareButton
                        videoId={video._id}
                        videoTitle={video.title}
                        onShareSuccess={(_, shareCount) => handleShareSuccess(video._id, shareCount)}
                      />
                      </div>
                    )}
                  </div>
                </article>
              </div>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            className="inner-slider-nav-btn next"
            onClick={handleNext}
            title="Next (→)"
          >
            <FiChevronRight size={32} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="inner-slider-dots">
          {videos.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              title={`Go to video ${index + 1}`}
            />
          ))}
        </div>

        {/* Instructions */}
        <div className="inner-slider-instructions">
          <span>← → to navigate • Swipe on mobile • ESC to close</span>
        </div>
      </div>
    </div>
  );
});

InnerSlider.displayName = 'InnerSlider';

export default InnerSlider;
