import React, { useState, useRef, useEffect } from 'react';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize } from 'react-icons/fi';
import ProgressBar from './ProgressBar';
import LoadingSpinner from './LoadingSpinner';
import '../styles/components/VideoPlayer.css';

/**
 * VideoPlayer Component
 * Full-featured HTML5 video player with custom controls
 */
const VideoPlayer = ({ 
  videoUrl, 
  videoTitle = 'Video',
  poster,
  active = true,
  shouldLoad = true,
  onTimeUpdate = () => {},
  autoPlay = false 
}) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const controlsTimeoutRef = useRef(null);
  const canLoadVideo = shouldLoad && isInView;

  // Handle play/pause
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  // Handle mute/unmute
  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  // Handle seeking
  const handleSeek = (newTime) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Handle fullscreen
  const handleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen().catch((err) => {
          console.error('Fullscreen error:', err);
        });
      }
    }
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      onTimeUpdate(videoRef.current.currentTime);

      // Update buffered amount
      if (videoRef.current.buffered.length > 0) {
        setBuffered(videoRef.current.buffered.end(0));
      }
    }
  };

  // Handle metadata loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Handle playing/loading states
  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleLoadStart = () => setIsLoading(true);
  const handleCanPlay = () => setIsLoading(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.35, rootMargin: '120px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!active || !isInView) {
      video.pause();
      return;
    }

    if (autoPlay && canLoadVideo) {
      video.muted = true;
      setIsMuted(true);
      video.play().catch(() => {});
    }
  }, [active, autoPlay, canLoadVideo, isInView]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || canLoadVideo) return;

    video.pause();
    video.removeAttribute('src');
    video.load();
    setCurrentTime(0);
    setDuration(0);
    setBuffered(0);
  }, [canLoadVideo]);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Handle controls visibility
  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);

    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  return (
    <div
      className={`video-player-container ${isFullscreen ? 'fullscreen' : ''}`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="video-player"
        src={canLoadVideo ? videoUrl : undefined}
        poster={poster}
        preload={canLoadVideo ? 'metadata' : 'none'}
        onPlay={handlePlay}
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        playsInline
        muted={isMuted}
      >
        Your browser does not support the video tag.
      </video>

      {isLoading && <LoadingSpinner visible={true} message="Loading..." />}

      <div className={`video-player-controls ${showControls ? 'visible' : ''}`}>
        {/* Progress Bar */}
        <div className="video-progress">
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
            buffered={buffered}
          />
        </div>

        {/* Control Buttons */}
        <div className="video-controls-bottom">
          <div className="video-controls-left">
            {/* Play/Pause Button */}
            <button
              className="video-control-btn"
              onClick={handlePlayPause}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <FiPause size={20} />
              ) : (
                <FiPlay size={20} />
              )}
            </button>

            {/* Volume Control */}
            <div className="volume-control">
              <button
                className="video-control-btn"
                onClick={handleMuteToggle}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <FiVolumeX size={20} />
                ) : (
                  <FiVolume2 size={20} />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="volume-slider"
                title="Volume"
              />
            </div>
          </div>

          <div className="video-controls-right">
            {/* Fullscreen Button */}
            <button
              className="video-control-btn"
              onClick={handleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              <FiMaximize size={20} />
            </button>
          </div>
        </div>

        {/* Video Title Overlay */}
        <div className="video-title-overlay">{videoTitle}</div>
      </div>
    </div>
  );
};

export default VideoPlayer;
