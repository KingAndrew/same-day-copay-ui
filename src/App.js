
import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Colors } from "../constants";
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

  // Import the screen renderer
  import renderScreen from "./utils/screenRenderer";
  
  // Use the imported function to render the screen
  const renderCurrentScreen = () => {
    return renderScreen(
      currentScreen,
      handleNavigate,
      { userData, setUserData },
      frontReceiptImage,
      backReceiptImage,
      setFrontReceiptImage,
      setBackReceiptImage
    );
  };

  return <SafeAreaView style={styles.container}>{renderCurrentScreen()}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
});

export default App;
