import React from "react";
import {
  HomeScreen,
  LoginScreen,
  MainMenuScreen,
  NewPurchaseScreen,
  AccountSetupScreen,
  AccountHistoryScreen,
  AboutScreen,
  SnapReceiptScreen,
} from "../screens/index.js";

// Add your screen rendering logic here
export function renderScreen(currentScreen, props) {
  switch (currentScreen) {
    case 'Home':
      return <HomeScreen {...props} />;
    case 'Login':
      return <LoginScreen {...props} />;
    case 'MainMenu':
      return <MainMenuScreen {...props} />;
    case 'NewPurchase':
      return <NewPurchaseScreen {...props} />;
    case 'AccountSetup':
      return <AccountSetupScreen {...props} />;
    case 'AccountHistory':
      return <AccountHistoryScreen {...props} />;
    case 'About':
      return <AboutScreen {...props} />;
    case 'SnapReceipt':
      return <SnapReceiptScreen {...props} />;
    default:
      return <HomeScreen {...props} />;
  }
}