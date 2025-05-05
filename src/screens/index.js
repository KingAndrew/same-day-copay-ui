
import AboutScreen from './AboutScreen.js';
import AccountHistoryScreen from './AccountHistoryScreen.js';
import AccountSetupScreen from './AccountSetupScreen.js';
import HomeScreen from './HomeScreen.js';
import LoginScreen from './LoginScreen.js';
import MainMenuScreen from './MainMenuScreen.js';
import NewPurchaseScreen from './NewPurchaseScreen.js';
import SnapReceiptScreen from './SnapReceiptScreen.js';

// Safe navigation function to use as default
const safeNavigate = (screen) => {
  console.warn(`Navigation to "${screen}" was attempted, but navigateTo function was not provided to component`);
};

// Safe data setter function to use as default
const safeSetter = (data) => {
  console.warn(`Data setting was attempted, but setter function was not provided to component`, data);
};

// Export all screens with wrapped components that provide defaults
export {
  AboutScreen,
  AccountHistoryScreen,
  AccountSetupScreen,
  HomeScreen,
  LoginScreen,
  MainMenuScreen,
  NewPurchaseScreen,
  SnapReceiptScreen,
  // Also export utility functions
  safeNavigate,
  safeSetter
};
