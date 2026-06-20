import React, { useState, useRef, useEffect } from 'react';
import { FiShare2 } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { trackVideoShare } from '../services/api';
import '../styles/components/ShareButton.css';

/**
 * ShareButton Component
 * Allows users to share videos to different platforms
 */
const ShareButton = ({ videoId, videoTitle = 'Check out this video!', onShareSuccess = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleShare = async (platform) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await trackVideoShare(videoId, platform);
      setShareMessage(`Shared to ${platform}!`);
      setTimeout(() => {
        setShareMessage('');
        setIsOpen(false);
      }, 2000);
      onShareSuccess(platform, response.shareCount);
    } catch (error) {
      console.error('Error sharing video:', error);
      setShareMessage('Failed to share');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      const url = `${window.location.origin}?video=${videoId}`;
      await navigator.clipboard.writeText(url);
      await handleShare('copy_link');
      setShareMessage('Link copied to clipboard!');
      setTimeout(() => setShareMessage(''), 2000);
    } catch (error) {
      console.error('Error copying link:', error);
    }
  };

  const sharePlatforms = [
    {
      name: 'Facebook',
      icon: FaFacebook,
      onClick: () => handleShare('facebook'),
      color: '#1877F2',
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      onClick: () => handleShare('twitter'),
      color: '#1DA1F2',
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      onClick: () => handleShare('linkedin'),
      color: '#0A66C2',
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      onClick: () => handleShare('whatsapp'),
      color: '#25D366',
    },
  ];

  return (
    <div className="share-button-container" ref={menuRef}>
      <button
        className="share-button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        title="Share video"
      >
        <FiShare2 className="share-icon" />
        <span>Share</span>
      </button>

      {isOpen && (
        <div className="share-menu">
          <div className="share-menu-title">Share to:</div>

          <div className="share-platforms">
            {sharePlatforms.map((platform) => {
              const IconComponent = platform.icon;
              return (
                <button
                  key={platform.name}
                  className="share-platform-btn"
                  onClick={platform.onClick}
                  disabled={isLoading}
                  style={{ '--platform-color': platform.color }}
                  title={`Share on ${platform.name}`}
                >
                  <IconComponent className="platform-icon" />
                  <span>{platform.name}</span>
                </button>
              );
            })}
          </div>

          <div className="share-divider"></div>

          <button
            className="share-copy-link-btn"
            onClick={handleCopyLink}
            disabled={isLoading}
            title="Copy link to clipboard"
          >
            <span>📋 Copy Link</span>
          </button>

          {shareMessage && <div className="share-message">{shareMessage}</div>}
        </div>
      )}
    </div>
  );
};

export default ShareButton;
