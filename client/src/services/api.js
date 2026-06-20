import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add error handling interceptor
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// ============ VIDEOS API ============

/**
 * Fetch all videos
 * @returns {Promise} Array of videos
 */
export const fetchAllVideos = async () => {
  try {
    const response = await apiClient.get('/videos');
    return response.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

/**
 * Fetch single video by ID
 * @param {number} videoId - Video ID
 * @returns {Promise} Video data
 */
export const fetchVideoById = async (videoId) => {
  try {
    const response = await apiClient.get(`/videos/${videoId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching video:', error);
    throw error;
  }
};

/**
 * Fetch videos with pagination
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {Promise} Paginated videos
 */
export const fetchPaginatedVideos = async (page = 1, limit = 10) => {
  try {
    const response = await apiClient.get('/videos/paginated', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching paginated videos:', error);
    throw error;
  }
};

// ============ LIKES API ============

/**
 * Toggle like on a video
 * @param {number} videoId - Video ID
 * @returns {Promise} Like response
 */
export const toggleVideoLike = async (videoId) => {
  try {
    const response = await apiClient.post('/like', {
      videoId,
    });
    return response.data;
  } catch (error) {
    console.error('Error liking video:', error);
    throw error;
  }
};

/**
 * Get like count for a video
 * @param {number} videoId - Video ID
 * @returns {Promise} Like count
 */
export const getLikeCount = async (videoId) => {
  try {
    const response = await apiClient.get(`/like/${videoId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching like count:', error);
    throw error;
  }
};

// ============ SHARES API ============

/**
 * Track video share
 * @param {number} videoId - Video ID
 * @param {string} platform - Share platform (facebook, twitter, linkedin, whatsapp, copy_link, email)
 * @returns {Promise} Share response
 */
export const trackVideoShare = async (videoId, platform = 'copy_link') => {
  try {
    const response = await apiClient.post('/share', {
      videoId,
      platform: platform,
    });
    return response.data;
  } catch (error) {
    console.error('Error tracking share:', error);
    throw error;
  }
};

/**
 * Get share count and statistics for a video
 * @param {number} videoId - Video ID
 * @returns {Promise} Share statistics
 */
export const getShareStatistics = async (videoId) => {
  try {
    const response = await apiClient.get(`/share/${videoId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching share statistics:', error);
    throw error;
  }
};

// ============ HEALTH CHECK ============

/**
 * Check if API is online
 * @returns {Promise} Health status
 */
export const checkAPIHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    console.error('API Health Check Failed:', error);
    throw error;
  }
};

export default apiClient;
