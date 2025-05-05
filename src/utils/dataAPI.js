import { mockData } from './mockDataSource.js';

// Data API for accessing and manipulating data
const dataAPI = {
  // Get data from the mock data source
  getData: async function(key) {
    console.log(`Retrieving data for key: ${key}`);
    try {
      return mockData[key];
    } catch (error) {
      console.error(`Error retrieving data for key ${key}:`, error);
      return null;
    }
  },

  // Save data to the mock data source
  saveData: async function(key, data) {
    console.log(`Saving data for key: ${key}`, data);
    try {
      mockData[key] = data;
      return true;
    } catch (error) {
      console.error(`Error saving data for key ${key}:`, error);
      return false;
    }
  },

  // Delete data from the mock data source
  deleteData: async function(key) {
    console.log(`Deleting data for key: ${key}`);
    try {
      if (mockData[key]) {
        delete mockData[key];
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Error deleting data for key ${key}:`, error);
      return false;
    }
  }
};

export { dataAPI };