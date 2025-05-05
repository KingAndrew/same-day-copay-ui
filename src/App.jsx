import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen.js';
import { 
  LoginScreen, 
  MainMenuScreen,
  AccountSetupScreen, 
  AccountHistoryScreen,
  AboutScreen,
  NewPurchaseScreen,
  SnapReceiptScreen
} from './screens/index.js';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [userData, setUserData] = useState(null);
  const [frontReceiptImage, setFrontReceiptImage] = useState(null);
  const [backReceiptImage, setBackReceiptImage] = useState(null);

  // Navigation function to pass to all screens
  const navigateTo = (screenName) => {
    console.log(`Navigating to: ${screenName}`);
    setCurrentScreen(screenName);
  };

  // Render the appropriate screen based on currentScreen state
  const renderScreen = () => {
    switch (currentScreen) {
      case "login":
        return (
          <LoginScreen
            navigateTo={navigateTo}
            setUserData={setUserData}
          />
        );
      case "main-menu":
        return (
          <MainMenuScreen
            navigateTo={navigateTo}
            userData={userData}
          />
        );
      case "new-purchase":
        return (
          <NewPurchaseScreen
            navigateTo={navigateTo}
            frontReceiptImage={frontReceiptImage}
            backReceiptImage={backReceiptImage}
          />
        );
      case "account-setup":
        return (
          <AccountSetupScreen 
            navigateTo={navigateTo} 
            userData={userData}
          />
        );
      case "account-history":
        return (
          <AccountHistoryScreen 
            navigateTo={navigateTo} 
          />
        );
      case "about":
        return (
          <AboutScreen 
            navigateTo={navigateTo} 
          />
        );
      case "snap-receipt":
        return (
          <SnapReceiptScreen
            navigateTo={navigateTo}
            isFrontSide={!frontReceiptImage}
            setFrontReceiptImage={setFrontReceiptImage}
            setBackReceiptImage={setBackReceiptImage}
          />
        );
      default:
        return (
          <HomeScreen 
            navigateTo={navigateTo} 
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;