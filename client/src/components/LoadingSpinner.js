import React from 'react';
import '../styles/components/LoadingSpinner.css';

/**
 * LoadingSpinner Component
 * Shows a loading spinner while video is loading/buffering
 */
const LoadingSpinner = ({ visible = true, message = 'Loading...' }) => {
  if (!visible) return null;

  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p className="loading-message">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
