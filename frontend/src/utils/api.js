// API Utility Functions for Frontend
// File: frontend/src/utils/api.js

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const requestOptions = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, requestOptions);
    return await handleResponse(response);
  } catch (error) {
    console.error(`API request failed: ${url}`, error);
    throw error;
  }
};

// Get personalized internship recommendations
export const getRecommendations = async (requestData) => {
  try {
    const data = await apiRequest('/api/recommend', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
    return data;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw new Error('Failed to get recommendations. Please check your connection and try again.');
  }
};

// Get available sectors
export const getSectors = async () => {
  try {
    return await apiRequest('/api/sectors');
  } catch (error) {
    console.error('Error getting sectors:', error);
    return { sectors: [] };
  }
};

// Get available skills
export const getSkills = async () => {
  try {
    return await apiRequest('/api/skills');
  } catch (error) {
    console.error('Error getting skills:', error);
    return { skills: [] };
  }
};

// Get available locations
export const getLocations = async () => {
  try {
    return await apiRequest('/api/locations');
  } catch (error) {
    console.error('Error getting locations:', error);
    return { states: [], cities: [] };
  }
};

// Get system statistics
export const getStats = async () => {
  try {
    return await apiRequest('/api/stats');
  } catch (error) {
    console.error('Error getting stats:', error);
    return null;
  }
};

// Health check
export const healthCheck = async () => {
  try {
    return await apiRequest('/health');
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

// Test API connection
export const testConnection = async () => {
  try {
    const response = await apiRequest('/');
    return response;
  } catch (error) {
    console.error('Connection test failed:', error);
    throw new Error('Cannot connect to the API server. Please ensure the backend is running.');
  }
};

export default {
  getRecommendations,
  getSectors,
  getSkills,
  getLocations,
  getStats,
  healthCheck,
  testConnection,
};