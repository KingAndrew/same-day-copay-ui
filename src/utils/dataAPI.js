// Data API module for handling account setup and other data operations
import { mockData as mockDataSource } from './mockDataSource.js.js.js';

// Main data API object with methods for data operations
export const dataAPI = {
  // Method to save account setup data
  saveAccountSetup: async (accountData) => {
    console.log('Saving account setup data:', accountData);
    return mockDataSource.saveData('accountSetup', accountData);
  },

  // Method to retrieve account setup data
  getAccountSetup: async () => {
    return mockDataSource.getData('accountSetup');
  },

  // Method to save new purchase data
  savePurchase: async (purchaseData) => {
    console.log('Saving purchase data:', purchaseData);
    return mockDataSource.saveData('purchases', purchaseData);
  },

  // Method to get purchase history
  getPurchaseHistory: async () => {
    return mockDataSource.getData('purchases');
  },

  // Method to save user profile data
  saveUserProfile: async (profileData) => {
    console.log('Saving user profile data:', profileData);
    return mockDataSource.saveData('userProfile', profileData);
  },

  // Method to get user profile data
  getUserProfile: async () => {
    return mockDataSource.getData('userProfile');
  },

  // Clear all stored data (for testing/debugging)
  clearAllData: async () => {
    return mockDataSource.clearAllData();
  }
};