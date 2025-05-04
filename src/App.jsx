
import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Colors } from "../constants";
import renderScreen from "./utils/screenRenderer";
import handleImageCapture from "./utils/imageCapture";

function App() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [userData, setUserData] = useState(null);

  // Global state for captured receipt images
  const [frontReceiptImage, setFrontReceiptImage] = useState(null);
  const [backReceiptImage, setBackReceiptImage] = useState(null);

  const handleNavigate = (screen) => {
    // Handle image capture logic in separate file
    handleImageCapture(
      currentScreen, 
      screen, 
      frontReceiptImage, 
      backReceiptImage, 
      setFrontReceiptImage, 
      setBackReceiptImage
    );
    
    setCurrentScreen(screen);
  };
  
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

  return (
    <SafeAreaView style={styles.container}>
      {renderCurrentScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
});

export default App;
