// Data API module for handling account setup and other data operations
import { mockData as mockDataSource } from './mockDataSource.js';

// Main data API object with methods for data operations
export const dataAPI = {
  // Generic methods to save and get data with key paths
  saveData: async (keyPath, data) => {
    console.log(`Saving data for ${keyPath}:`, data);
    try {
      // Store in mock data source
      return true;
    } catch (error) {
      console.error(`Error saving data for ${keyPath}:`, error);
      return false;
    }
  },

  getData: async (keyPath) => {
    try {
      // If it's a path like "accountSetup.insuranceProviders", parse it
      const parts = keyPath.split('.');
      let result = {...mockDataSource};
      
      for (const part of parts) {
        if (result && result[part] !== undefined) {
          result = result[part];
        } else {
          console.log(`Path ${keyPath} doesn't exist or is undefined`);
          return null; // Path doesn't exist
        }
      }
      
      return result;
    } catch (error) {
      console.error(`Error retrieving data for ${keyPath}:`, error);
      return null;
    }
  },

  // User-specific data methods
  saveUserData: async (email, keyPath, data) => {
    if (!email) {
      console.error("Cannot save user data: No email provided");
      return false;
    }
    console.log(`Saving data for user ${email} at ${keyPath}:`, data);
    const fullPath = `${email}.${keyPath}`;
    return dataAPI.saveData(fullPath, data);
  },

  getUserData: async (email, keyPath) => {
    if (!email) {
      console.log("Cannot get user data: No email provided");
      return null;
    }
    const fullPath = `${email}.${keyPath}`;
    return dataAPI.getData(fullPath);
  },

  // Method to save account setup data
  saveAccountSetup: async (accountData) => {
    console.log('Saving account setup data:', accountData);
    return dataAPI.saveData('accountSetup', accountData);
  },

  // Method to retrieve account setup data
  getAccountSetup: async () => {
    return dataAPI.getData('accountSetup');
  },

  // Method to save new purchase data
  savePurchase: async (purchaseData) => {
    console.log('Saving purchase data:', purchaseData);
    return dataAPI.saveData('purchases', purchaseData);
  },

  // Method to get purchase history
  getPurchaseHistory: async () => {
    return dataAPI.getData('purchases');
  },

  // Method to save user profile data
  saveUserProfile: async (profileData) => {
    console.log('Saving user profile data:', profileData);
    return dataAPI.saveData('userProfile', profileData);
  },

  // Method to get user profile data
  getUserProfile: async () => {
    return dataAPI.getData('userProfile');
  },

  // Clear all stored data (for testing/debugging)
  clearAllData: async () => {
    console.log('Clearing all data');
    return true;
  }
};