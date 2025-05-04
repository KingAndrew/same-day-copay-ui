
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

// Mock components that mirror the ones in your App.js
const MainMenuScreen = ({ navigateTo, userData }) => <div>Main Menu Screen</div>;
const LoginScreen = ({ navigateTo, setUserData }) => <div>Login Screen</div>;
const NewPurchaseScreen = ({ navigateTo, frontReceiptImage, backReceiptImage }) => <div>New Purchase Screen</div>;
const AccountSetupScreen = ({ navigateTo }) => <div>Account Setup Screen</div>;
const AccountHistoryScreen = ({ navigateTo }) => <div>Account History Screen</div>;
const AboutScreen = ({ navigateTo }) => <div>About Screen</div>;
const SnapReceiptScreen = ({ navigateTo, isFrontSide, setFrontReceiptImage, setBackReceiptImage }) => <div>Snap Receipt Screen</div>;
const HomeScreen = ({ navigateTo }) => <div>Home Screen</div>;

// This is a test function to debug switch/case statements with JSX
function SwitchCaseTest() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [userData, setUserData] = useState(null);
  const [frontReceiptImage, setFrontReceiptImage] = useState(null);
  const [backReceiptImage, setBackReceiptImage] = useState(null);

  // Simple function that simulates navigation
  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
  };

  // This mirrors exactly your App.js renderScreen function
  const renderScreen = () => {
    switch (currentScreen) {
      case "main-menu":
        return (
          <MainMenuScreen
            navigateTo={handleNavigate}
            userData={userData}
          />
        );
      case "login":
        return (
          <LoginScreen
            navigateTo={handleNavigate}
            setUserData={setUserData}
          />
        );
      case "new-purchase":
        return (
          <NewPurchaseScreen
            navigateTo={handleNavigate}
            frontReceiptImage={frontReceiptImage}
            backReceiptImage={backReceiptImage}
          />
        );
      case "account-setup":
        return (
          <AccountSetupScreen 
            navigateTo={handleNavigate} 
          />
        );
      case "account-history":
        return (
          <AccountHistoryScreen 
            navigateTo={handleNavigate} 
          />
        );
      case "about":
        return (
          <AboutScreen 
            navigateTo={handleNavigate} 
          />
        );
      case "snap-receipt":
        return (
          <SnapReceiptScreen
            navigateTo={handleNavigate}
            isFrontSide={!frontReceiptImage}
            setFrontReceiptImage={setFrontReceiptImage}
            setBackReceiptImage={setBackReceiptImage}
          />
        );
      default:
        return (
          <HomeScreen 
            navigateTo={handleNavigate} 
          />
        );
    }
  };

  return (
    <div style={styles.container}>
      <h1>Test Component</h1>
      {renderScreen()}
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f7",
  },
});

export default SwitchCaseTest;
