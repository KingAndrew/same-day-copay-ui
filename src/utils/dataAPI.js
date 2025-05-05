
import { mockData } from './mockDataSource.js';

// In-memory storage for user data
const userDataStore = {
  userData: null,
  accountInfo: null,
  insuranceInfo: null,
  paymentMethods: [],
};

// The main data API object
export const dataAPI = {
  // User data methods
  getUserData: () => {
    return userDataStore.userData || mockData.userData;
  },
  
  setUserData: (data) => {
    userDataStore.userData = { ...data };
    return true;
  },
  
  // Account methods
  getAccountInfo: () => {
    return userDataStore.accountInfo || mockData.accountInfo;
  },
  
  setAccountInfo: (data) => {
    userDataStore.accountInfo = { ...data };
    return true;
  },
  
  // Insurance methods
  getInsuranceInfo: () => {
    return userDataStore.insuranceInfo || mockData.insuranceInfo;
  },
  
  setInsuranceInfo: (data) => {
    userDataStore.insuranceInfo = { ...data };
    return true;
  },
  
  // Payment methods
  getPaymentMethods: () => {
    return userDataStore.paymentMethods.length > 0 
      ? userDataStore.paymentMethods 
      : mockData.paymentMethods;
  },
  
  addPaymentMethod: (method) => {
    userDataStore.paymentMethods.push({ ...method, id: Date.now().toString() });
    return true;
  },
  
  removePaymentMethod: (id) => {
    const index = userDataStore.paymentMethods.findIndex(method => method.id === id);
    if (index !== -1) {
      userDataStore.paymentMethods.splice(index, 1);
      return true;
    }
    return false;
  },
  
  // Copay history
  getCopayHistory: () => {
    return mockData.copayHistory;
  },
  
  // Reset all data (for testing)
  resetAllData: () => {
    userDataStore.userData = null;
    userDataStore.accountInfo = null;
    userDataStore.insuranceInfo = null;
    userDataStore.paymentMethods = [];
    return true;
  }
};
