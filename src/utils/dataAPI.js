/**
 * Data Access API
 *
 * This module provides a consistent interface for data storage and retrieval,
 * with the ability to switch between different storage backends.
 */

const mockData = require("./mockDataSource");

// In a real app, this would be more sophisticated with actual backend API calls
// or local storage interactions
const dataAPI = {
  /**
   * Get data by key
   * @param {string} key - Dot notation path to the data (e.g., "user.preferences.theme")
   * @returns {Promise<any>} - The data at the specified path
   */
  getData: async function (key) {
    try {
      // Split the key on dots to traverse nested objects
      const parts = key.split(".");
      let current = mockData;

      // Traverse the object following the key path
      for (const part of parts) {
        if (current && typeof current === "object" && part in current) {
          current = current[part];
        } else {
          return null; // Path doesn't exist
        }
      }

      return current;
    } catch (error) {
      console.error("Error retrieving data:", error);
      return null;
    }
  },

  /**
   * Save data by key
   * @param {string} key - Dot notation path to save the data at
   * @param {any} data - The data to save
   * @returns {Promise<boolean>} - Success indicator
   */
  saveData: async function (key, data) {
    try {
      // Split the key on dots to traverse nested objects
      const parts = key.split(".");

      // If it's a simple key, just set it directly in mockData
      if (parts.length === 1) {
        mockData[key] = data;
        return true;
      }

      // For nested keys, traverse and create objects as needed
      let current = mockData;

      // Navigate to the parent object where we'll set the final property
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];

        // Create path if it doesn't exist
        if (!(part in current)) {
          current[part] = {};
        }

        current = current[part];
      }

      // Set the value on the final object
      const finalKey = parts[parts.length - 1];
      current[finalKey] = data;

      return true;
    } catch (error) {
      console.error("Error saving data:", error);
      return false;
    }
  },

  /**
   * Delete data by key
   * @param {string} key - Dot notation path to delete
   * @returns {Promise<boolean>} - Success indicator
   */
  deleteData: async function (key) {
    try {
      const parts = key.split(".");

      // If it's a simple key, just delete it directly from mockData
      if (parts.length === 1) {
        if (key in mockData) {
          delete mockData[key];
          return true;
        }
        return false; // Key doesn't exist
      }

      // For nested keys, find the parent object
      let current = mockData;

      // Navigate to the parent object containing the property to delete
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];

        if (current && typeof current === "object" && part in current) {
          current = current[part];
        } else {
          return false; // Path doesn't exist
        }
      }

      // Delete the property from the parent object
      const finalKey = parts[parts.length - 1];
      if (finalKey in current) {
        delete current[finalKey];
        return true;
      }

      return false; // Final key doesn't exist
    } catch (error) {
      console.error("Error deleting data:", error);
      return false;
    }
  },
};

// Export the dataAPI object
module.exports = { dataAPI };
