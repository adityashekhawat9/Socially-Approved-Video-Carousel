import React, { useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { toggleVideoLike } from '../services/api';
import '../styles/components/LikeButton.css';

/**
 * LikeButton Component
 * Allows users to like/unlike videos with real-time count update
 */
const LikeButton = ({ videoId, initialLikes = 0, onLikeChange = () => {} }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await toggleVideoLike(videoId);
      setLiked(response.liked);
      setLikeCount(response.likeCount);
      onLikeChange(response.likeCount);
    } catch (error) {
      console.error('Error liking video:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`like-button ${liked ? 'liked' : ''}`}
      onClick={handleLike}
      disabled={isLoading}
      title={liked ? 'Unlike' : 'Like'}
    >
      <FiHeart className="like-icon" />
      <span className="like-count">{likeCount}</span>
    </button>
  );
};

export default LikeButton;
