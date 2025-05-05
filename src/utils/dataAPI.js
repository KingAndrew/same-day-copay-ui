
import { mockData } from './mockDataSource.js';

// Data API implementation for accessing application data
// This provides a unified interface for data operations
export const dataAPI = {
  /**
   * Retrieves data for the specified key
   * @param {string} key - The data key to retrieve
   * @returns {Promise<Object>} - Promise resolving to the data object
   */
  async getData(key) {
    try {
      console.log(`Getting data for key: ${key}`);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Return mock data
      return mockData[key];
    } catch (error) {
      console.error('Error in getData:', error);
      return null;
    }
  },
  
  /**
   * Saves data for the specified key
   * @param {string} key - The data key to save
   * @param {Object} data - The data to save
   * @returns {Promise<boolean>} - Promise resolving to success status
   */
  async saveData(key, data) {
    try {
      console.log(`Saving data for key: ${key}`, data);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Save to mock data
      mockData[key] = data;
      return true;
    } catch (error) {
      console.error('Error in saveData:', error);
      return false;
    }
  },
  
  /**
   * Deletes data for the specified key
   * @param {string} key - The data key to delete
   * @returns {Promise<boolean>} - Promise resolving to success status
   */
  async deleteData(key) {
    try {
      console.log(`Deleting data for key: ${key}`);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Delete from mock data
      if (key in mockData) {
        delete mockData[key];
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error in deleteData:', error);
      return false;
    }
  }
};

// Export default for compatibility with tests
export default { dataAPI };
