
import { mockDataSource } from './mockDataSource.js';

/**
 * Data API Module
 * Provides methods for data access, storage and manipulation
 */
class DataAPI {
  constructor() {
    this.dataSource = mockDataSource;
    this.debugMode = false;
  }

  /**
   * Enable or disable debug mode
   * @param {boolean} enabled - Whether to enable debug mode
   */
  setDebugMode(enabled) {
    this.debugMode = enabled;
  }

  /**
   * Log debug messages if debug mode is enabled
   * @param {string} message - Message to log
   * @param {any} data - Optional data to log
   */
  debugLog(message, data = null) {
    if (this.debugMode) {
      if (data) {
        console.log(`${message}:`, data);
      } else {
        console.log(message);
      }
    }
  }

  /**
   * Save data for a specific key
   * @param {string} key - The key to save data under
   * @param {any} data - The data to save
   * @returns {boolean} - Success status
   */
  saveData(key, data) {
    try {
      this.debugLog(`Saving data for key '${key}'`, data);
      
      // Split the key path if it contains dots (for nested objects)
      const keyParts = key.split('.');
      
      if (keyParts.length === 1) {
        // Simple key, just set it directly
        this.dataSource.setData(key, data);
      } else {
        // Handle nested keys
        const topLevelKey = keyParts[0];
        let currentObject = this.dataSource.getData(topLevelKey) || {};
        
        // Create a reference to the current position in the object
        let currentPosition = currentObject;
        
        // Navigate through the object hierarchy except for the last key
        for (let i = 1; i < keyParts.length - 1; i++) {
          const part = keyParts[i];
          
          // Create nested object if it doesn't exist
          if (!currentPosition[part]) {
            currentPosition[part] = {};
          }
          
          // Move to the next level
          currentPosition = currentPosition[part];
        }
        
        // Set the value at the final position
        const lastKey = keyParts[keyParts.length - 1];
        currentPosition[lastKey] = data;
        
        // Save the entire object back
        this.dataSource.setData(topLevelKey, currentObject);
      }
      
      return true;
    } catch (error) {
      this.debugLog(`Error saving data: ${error.message}`);
      return false;
    }
  }

  /**
   * Get data for a specific key
   * @param {string} key - The key to retrieve data for
   * @returns {any} - The retrieved data or null if not found
   */
  getData(key) {
    try {
      // Split the key path if it contains dots (for nested objects)
      const keyParts = key.split('.');
      
      if (keyParts.length === 1) {
        // Simple key, get it directly
        const data = this.dataSource.getData(key);
        this.debugLog(`Direct key access for '${key}'`, data);
        return data;
      } else {
        // Handle nested keys
        const topLevelKey = keyParts[0];
        let currentObject = this.dataSource.getData(topLevelKey);
        
        if (!currentObject) {
          this.debugLog(`Key path '${key}' not found - top level key missing`);
          return null;
        }
        
        // Navigate through the object hierarchy
        for (let i = 1; i < keyParts.length; i++) {
          const part = keyParts[i];
          
          if (currentObject[part] === undefined) {
            this.debugLog(`Key path '${key}' not found at part '${part}'`);
            return null;
          }
          
          currentObject = currentObject[part];
        }
        
        this.debugLog(`Nested key access for '${key}'`, currentObject);
        return currentObject;
      }
    } catch (error) {
      this.debugLog(`Error getting data: ${error.message}`);
      return null;
    }
  }

  /**
   * Delete data for a specific key
   * @param {string} key - The key to delete data for
   * @returns {boolean} - Success status
   */
  deleteData(key) {
    try {
      this.debugLog(`Deleting data for direct key '${key}'`);
      
      // Split the key path if it contains dots (for nested objects)
      const keyParts = key.split('.');
      
      if (keyParts.length === 1) {
        // Simple key, delete it directly
        this.dataSource.deleteData(key);
      } else {
        // Handle nested keys
        const topLevelKey = keyParts[0];
        let currentObject = this.dataSource.getData(topLevelKey);
        
        if (!currentObject) {
          this.debugLog(`Cannot delete - key path '${key}' not found`);
          return false;
        }
        
        // Navigate through the object hierarchy until the second last part
        let currentPosition = currentObject;
        for (let i = 1; i < keyParts.length - 1; i++) {
          const part = keyParts[i];
          
          if (currentPosition[part] === undefined) {
            this.debugLog(`Cannot delete - key path '${key}' not found at part '${part}'`);
            return false;
          }
          
          currentPosition = currentPosition[part];
        }
        
        // Delete the property at the final level
        const lastKey = keyParts[keyParts.length - 1];
        if (currentPosition[lastKey] !== undefined) {
          delete currentPosition[lastKey];
          
          // Save the modified object back
          this.dataSource.setData(topLevelKey, currentObject);
        } else {
          this.debugLog(`Cannot delete - final key '${lastKey}' not found`);
          return false;
        }
      }
      
      return true;
    } catch (error) {
      this.debugLog(`Error deleting data: ${error.message}`);
      return false;
    }
  }
}

// Create and export a singleton instance
const dataAPI = new DataAPI();

export { dataAPI };
