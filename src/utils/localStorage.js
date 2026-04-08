/**
 * Save data to localStorage
 * @param {string} key - The key to store
 * @param {any} value - The value to store
 */
export const saveToLocalStorage = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error saving to localStorage (key: ${key}):`, error);
  }
};

/**
 * Load data from localStorage
 * @param {string} key - The key to retrieve
 * @returns {any} - The retrieved value or null
 */
export const loadFromLocalStorage = (key) => {
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  } catch (error) {
    console.error(`Error loading from localStorage (key: ${key}):`, error);
    return null;
  }
};

/**
 * Delete data from localStorage
 * @param {string} key - The key to delete
 */
export const deleteFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error deleting from localStorage (key: ${key}):`, error);
  }
};

/**
 * Clear all localStorage data
 */
export const clearAllLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

export default {
  saveToLocalStorage,
  loadFromLocalStorage,
  deleteFromLocalStorage,
  clearAllLocalStorage,
};
