import React, { useState, useEffect } from 'react';
import OuterSlider from './components/OuterSlider';
import { fetchAllVideos, checkAPIHealth } from './services/api';
import './styles/App.css';
import './styles/variables.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleVideoUpdate = (videoId, updates) => {
    setVideos((currentVideos) =>
      currentVideos.map((video) =>
        video._id === videoId ? { ...video, ...updates } : video
      )
    );
  };

  // Fetch videos on component mount
  useEffect(() => {
    const loadVideos = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check API connection
        try {
          const healthResponse = await checkAPIHealth();
          setIsConnected(true);
          console.log('✓ API Connection Status:', healthResponse.status);
        } catch (healthError) {
          console.warn('⚠ API Health Check Failed:', healthError.message);
          setIsConnected(false);
        }

        // Fetch videos
        const data = await fetchAllVideos();
        if (data.success && data.videos) {
          setVideos(data.videos);
          console.log(`✓ Loaded ${data.videos.length} videos`);
        }
      } catch (err) {
        console.error('✗ Error loading videos:', err);
        setError('Failed to load videos. Please try again later.');
        setVideos([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadVideos();
  }, []);

  return (
    <div className="App">
      {/* Header */}
      <header className="App-header">
        <div className="header-content">
          <h1>🎬 Socially Approved Carousel</h1>
          <p>Discover amazing videos with real-time engagement</p>
          {!isConnected && (
            <div className="connection-warning">
              ⚠️ API connection unavailable. Some features may not work.
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="App-main">
        {error && (
          <div className="error-banner">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="retry-btn"
            >
              Retry
            </button>
          </div>
        )}

        <OuterSlider 
          videos={videos} 
          isLoading={isLoading}
          onVideoUpdate={handleVideoUpdate}
        />
      </main>

      {/* Footer */}
      <footer className="App-footer">
        <div className="footer-content">
          <p>© 2026 Socially Approved Carousel - MERN Stack Video App</p>
          <div className="footer-stats">
            <span>Videos: {videos.length}</span>
            <span>Status: {isConnected ? '✓ Connected' : '✗ Disconnected'}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
