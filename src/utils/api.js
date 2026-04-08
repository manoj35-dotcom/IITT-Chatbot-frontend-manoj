import axios from 'axios';

// Replace with your actual API endpoint
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create an axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Send a message to the chatbot API
 * @param {string} message - The user message
 * @param {string} language - The selected language code
 * @returns {Promise<string>} - The bot's response
 */
export const sendMessage = async (message, language = 'en') => {
  try {
    const response = await axiosInstance.post('/chat', {
      message,
      language,
    });

    // Assuming your API returns { response: "message text" }
    return response.data.response || response.data.message || 'I could not process your request.';
  } catch (error) {
    console.error('API Error:', error);
    
    if (error.response) {
      throw new Error(error.response.data.error || 'Server error occurred');
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error('Error setting up request');
    }
  }
};

/**
 * Get chat history from backend
 * @returns {Promise<Array>} - Array of previous messages
 */
export const getChatHistory = async () => {
  try {
    const response = await axiosInstance.get('/history');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching history:', error);
    return [];
  }
};

/**
 * Clear chat history on backend
 * @returns {Promise<void>}
 */
export const clearChatHistory = async () => {
  try {
    await axiosInstance.delete('/history');
  } catch (error) {
    console.error('Error clearing history:', error);
  }
};

/**
 * Get available languages from backend
 * @returns {Promise<Array>} - Array of supported languages
 */
export const getAvailableLanguages = async () => {
  try {
    const response = await axiosInstance.get('/languages');
    return response.data || ['en', 'es', 'fr', 'de', 'hi'];
  } catch (error) {
    console.error('Error fetching languages:', error);
    return ['en', 'es', 'fr', 'de', 'hi'];
  }
};

export default axiosInstance;
