
/**
 * Application constants file
 * Centralized location for constant values used throughout the app
 */

// URLs for API endpoints and other resources
export const URLs = {
  API_BASE: 'https://api.samedaycopay.com',
  TERMS_OF_SERVICE: 'https://samedaycopay.com/terms',
  PRIVACY_POLICY: 'https://samedaycopay.com/privacy',
  IMAGES: '/images',
  AUDIO: '/audio',
  
  // Data source - can be switched between mock and remote API
  // For mock data use: 'file:///mockData'
  // For production use: 'https://api.samedaycopay.com'
  DATA_SOURCE: 'file:///mockData',
  
  // API endpoints
  API: {
    // Authentication
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    
    // User data
    USER_PROFILE: '/user/profile',
    ACCOUNT_HISTORY: '/user/history',
    
    // Receipt processing
    UPLOAD_RECEIPT: '/receipts/upload',
    RECEIPT_STATUS: '/receipts/status',
    
    // Faxing service
    FAX_RECEIPT: '/fax/send',
    FAX_STATUS: '/fax/status',
    
    // Banking/payment operations
    BANK_ACCOUNTS: '/banking/accounts',
    PAYMENT_STATUS: '/banking/payments',
    INITIATE_PAYMENT: '/banking/payments/create',
  }
};

// Colors used throughout the application
export const Colors = {
  // Primary colors
  FOREST_GREEN: '#1b702d',
  NAVY_BLUE: '#032f54',
  
  // Secondary colors
  SKY_BLUE: '#4a90e2',
  CORAL_RED: '#ff5a5f',
  GOLDEN_YELLOW: '#ffc107',
  
  // Neutral colors
  WHITE: '#ffffff',
  BLACK: '#000000',
  BACKGROUND: '#f5f5f7',
  LIGHT_GRAY: '#eeeeee',
  MEDIUM_GRAY: '#999999',
  DARK_GRAY: '#666666',
  
  // Status colors
  SUCCESS: '#4caf50',
  ERROR: '#f44336',
  WARNING: '#EBE600',
  INFO: '#2196f3',
};
