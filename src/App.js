
import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Colors } from "./constants";
import {
  HomeScreen,
  LoginScreen,
  MainMenuScreen,
  NewPurchaseScreen,
  AccountSetupScreen,
  AccountHistoryScreen,
  AboutScreen,
  SnapReceiptScreen,
} from "./screens";

function App() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [userData, setUserData] = useState(null);

  // Global state for captured receipt images
  const [frontReceiptImage, setFrontReceiptImage] = useState(null);
  const [backReceiptImage, setBackReceiptImage] = useState(null);

  const handleNavigate = (screen) => {
    // Special handling for snap-receipt screen
    if (screen === "snap-receipt") {
      // Determine if we're capturing front or back based on current state
      if (!frontReceiptImage) {
        // We're capturing front
      } else if (!backReceiptImage) {
        // We're capturing back
      }
    }

    // Handle returning from snap-receipt with captured image
    if (currentScreen === "snap-receipt" && screen === "new-purchase") {
      // Simulate capturing an image when returning
      const now = new Date();
      const mockImageUri = `/images/snap-receipt.png?t=${now.getTime()}`;

      if (!frontReceiptImage) {
        setFrontReceiptImage(mockImageUri);
      } else if (!backReceiptImage) {
        setBackReceiptImage(mockImageUri);
      }
    }

    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "login":
        return (
          <LoginScreen
            navigateTo={handleNavigate}
            setUserData={setUserData}
          />
        );
      case "main-menu":
        return (
          <MainMenuScreen navigateTo={handleNavigate} userData={userData} />
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
        return <AccountSetupScreen navigateTo={handleNavigate} />;
      case "account-history":
        return <AccountHistoryScreen navigateTo={handleNavigate} />;
      case "about":
        return <AboutScreen navigateTo={handleNavigate} />;
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
        return <HomeScreen navigateTo={handleNavigate} />;
    }
  };

  return <SafeAreaView style={styles.container}>{renderScreen()}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
});

export default App;
