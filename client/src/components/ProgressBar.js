import React from 'react';
import '../styles/components/ProgressBar.css';

/**
 * ProgressBar Component
 * Displays video progress with seek functionality
 */
const ProgressBar = ({ 
  currentTime = 0, 
  duration = 0, 
  onSeek = () => {},
  buffered = 0 
}) => {
  const percentage = duration ? (currentTime / duration) * 100 : 0;
  const bufferedPercentage = duration ? (buffered / duration) * 100 : 0;

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${minutes}:${String(secs).padStart(2, '0')}`;
  };

  const handleClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newTime = (x / rect.width) * duration;
    onSeek(newTime);
  };

  return (
    <div className="progress-bar-container">
      <div 
        className="progress-bar" 
        onClick={handleClick}
      >
        {/* Buffered progress */}
        <div 
          className="buffered-progress"
          style={{ width: `${bufferedPercentage}%` }}
        ></div>
        
        {/* Current progress */}
        <div 
          className="current-progress"
          style={{ width: `${percentage}%` }}
        >
          <div className="progress-handle"></div>
        </div>
      </div>

      {/* Time display */}
      <div className="time-display">
        <span className="current-time">{formatTime(currentTime)}</span>
        <span className="duration">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
