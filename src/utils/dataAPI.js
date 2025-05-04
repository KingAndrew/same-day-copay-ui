
/**
 * Data API Utility
 * Provides a unified interface for data access that can switch between
 * mock data and the middle tier API seamlessly
 */

import { URLs } from '../../constants';
import mockData from './mockDataSource';

// DataSource implementation for mock data (file)
class MockDataSource {
  async getData(key) {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        const data = mockData[key] || null;
        resolve(data);
      }, 100);
    });
  }

  async saveData(key, value) {
    return new Promise((resolve) => {
      // In a real implementation, we would save to the mockData
      // For now, just log and return success
      console.log(`[MockDataSource] Saving data for key: ${key}`, value);
      resolve(true);
    });
  }
}

// DataSource implementation for remote API
class RemoteDataSource {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getData(key) {
    try {
      const response = await fetch(`${this.baseUrl}/data/${encodeURIComponent(key)}`);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`[RemoteDataSource] Error fetching data for key: ${key}`, error);
      return null;
    }
  }

  async saveData(key, value) {
    try {
      const response = await fetch(`${this.baseUrl}/data/${encodeURIComponent(key)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      return true;
    } catch (error) {
      console.error(`[RemoteDataSource] Error saving data for key: ${key}`, error);
      return false;
    }
  }
}

// Determine which data source to use based on URLs.DATA_SOURCE
let dataSourceInstance;

if (URLs.DATA_SOURCE.startsWith('file://')) {
  // Using mock data
  dataSourceInstance = new MockDataSource();
} else {
  // Using remote API
  dataSourceInstance = new RemoteDataSource(URLs.DATA_SOURCE);
}

// Public API for data access
export const dataAPI = {
  /**
   * Get data by key
   * @param {string} key - The data key in format: [email.]screenName.dataName
   * @returns {Promise<any>} - The data object or null if not found
   */
  async getData(key) {
    return await dataSourceInstance.getData(key);
  },
  
  /**
   * Get data by key with user context
   * @param {string} email - User email for context
   * @param {string} key - The data key in format: screenName.dataName
   * @returns {Promise<any>} - The data object or null if not found
   */
  async getUserData(email, key) {
    if (!email) {
      return null;
    }
    return await dataSourceInstance.getData(`${email}.${key}`);
  },
  
  /**
   * Save data by key
   * @param {string} key - The data key in format: [email.]screenName.dataName
   * @param {any} value - The data to save
   * @returns {Promise<boolean>} - Success status
   */
  async saveData(key, value) {
    return await dataSourceInstance.saveData(key, value);
  },
  
  /**
   * Save data by key with user context
   * @param {string} email - User email for context
   * @param {string} key - The data key in format: screenName.dataName
   * @param {any} value - The data to save
   * @returns {Promise<boolean>} - Success status
   */
  async saveUserData(email, key, value) {
    if (!email) {
      return false;
    }
    return await dataSourceInstance.saveData(`${email}.${key}`, value);
  }
};
