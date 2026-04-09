import axios from 'axios';

// Replace with your actual API endpoint
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Create an axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    ...(process.env.REACT_APP_API_KEY ? { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } : {}),
  },
});

/**
 * Send a message to the chatbot API
 * @param {string} message - The user message
 * @returns {Promise<Object>} - Object containing response, status code, and success flag
 */
export const sendMessage = async (message) => {
  try {
    const response = await axiosInstance.post('/chat', {
      question: message,
    });

    // Check for success status codes (2xx range)
    const isSuccess = response.status >= 200 && response.status < 300;

    return {
      success: isSuccess,
      status: response.status,
      data: response.data.response || 'I could not process your request.',
      message: response.data.status === 'success' ? 'Message sent successfully' : 'Request processed'
    };
  } catch (error) {
    console.error('API Error:', error);

    if (error.response) {
      // Handle specific HTTP error codes
      const status = error.response.status;
      let errorMessage = 'Server error occurred';

      switch (status) {
        case 400:
          errorMessage = 'Bad request - please check your input';
          break;
        case 401:
          errorMessage = 'Unauthorized - please check your credentials';
          break;
        case 403:
          errorMessage = 'Forbidden - access denied';
          break;
        case 404:
          errorMessage = 'API endpoint not found';
          break;
        case 429:
          errorMessage = 'Too many requests - please try again later';
          break;
        case 500:
          errorMessage = 'Internal server error';
          break;
        case 502:
          errorMessage = 'Bad gateway - server temporarily unavailable';
          break;
        case 503:
          errorMessage = 'Service unavailable - please try again later';
          break;
        default:
          errorMessage = error.response.data?.error || `HTTP ${status} error`;
      }

      return {
        success: false,
        status: status,
        data: null,
        message: errorMessage
      };
    } else if (error.request) {
      return {
        success: false,
        status: null,
        data: null,
        message: 'No response from server. Please check your connection.'
      };
    } else {
      return {
        success: false,
        status: null,
        data: null,
        message: 'Error setting up request'
      };
    }
  }
};

/**
 * Get chat history from backend
 * @returns {Promise<Object>} - Object containing history data, status code, and success flag
 */
export const getChatHistory = async () => {
  try {
    const response = await axiosInstance.get('/history');

    // Check for success status codes (2xx range)
    const isSuccess = response.status >= 200 && response.status < 300;

    return {
      success: isSuccess,
      status: response.status,
      data: response.data || [],
      message: isSuccess ? 'History retrieved successfully' : 'Failed to retrieve history'
    };
  } catch (error) {
    console.error('Error fetching history:', error);

    if (error.response) {
      const status = error.response.status;
      let errorMessage = 'Failed to fetch history';

      switch (status) {
        case 404:
          errorMessage = 'History endpoint not found';
          break;
        case 500:
          errorMessage = 'Server error while fetching history';
          break;
        default:
          errorMessage = `HTTP ${status} error fetching history`;
      }

      return {
        success: false,
        status: status,
        data: [],
        message: errorMessage
      };
    } else {
      return {
        success: false,
        status: null,
        data: [],
        message: 'Network error while fetching history'
      };
    }
  }
};

/**
 * Clear chat history on backend
 * @returns {Promise<Object>} - Object containing status code and success flag
 */
export const clearChatHistory = async () => {
  try {
    const response = await axiosInstance.delete('/history');

    // Check for success status codes (2xx range)
    const isSuccess = response.status >= 200 && response.status < 300;

    return {
      success: isSuccess,
      status: response.status,
      data: null,
      message: isSuccess ? 'History cleared successfully' : 'Failed to clear history'
    };
  } catch (error) {
    console.error('Error clearing history:', error);

    if (error.response) {
      const status = error.response.status;
      let errorMessage = 'Failed to clear history';

      switch (status) {
        case 404:
          errorMessage = 'History endpoint not found';
          break;
        case 500:
          errorMessage = 'Server error while clearing history';
          break;
        default:
          errorMessage = `HTTP ${status} error clearing history`;
      }

      return {
        success: false,
        status: status,
        data: null,
        message: errorMessage
      };
    } else {
      return {
        success: false,
        status: null,
        data: null,
        message: 'Network error while clearing history'
      };
    }
  }
};

/**
 * Get available languages from backend
 * @returns {Promise<Object>} - Object containing languages data, status code, and success flag
 */
export const getAvailableLanguages = async () => {
  try {
    const response = await axiosInstance.get('/languages');

    // Check for success status codes (2xx range)
    const isSuccess = response.status >= 200 && response.status < 300;

    return {
      success: isSuccess,
      status: response.status,
      data: response.data || ['en', 'es', 'fr', 'de', 'hi'],
      message: isSuccess ? 'Languages retrieved successfully' : 'Failed to retrieve languages'
    };
  } catch (error) {
    console.error('Error fetching languages:', error);

    if (error.response) {
      const status = error.response.status;
      let errorMessage = 'Failed to fetch languages';

      switch (status) {
        case 404:
          errorMessage = 'Languages endpoint not found';
          break;
        case 500:
          errorMessage = 'Server error while fetching languages';
          break;
        default:
          errorMessage = `HTTP ${status} error fetching languages`;
      }

      return {
        success: false,
        status: status,
        data: ['en', 'es', 'fr', 'de', 'hi'],
        message: errorMessage
      };
    } else {
      return {
        success: false,
        status: null,
        data: ['en', 'es', 'fr', 'de', 'hi'],
        message: 'Network error while fetching languages'
      };
    }
  }
};

export default axiosInstance;
