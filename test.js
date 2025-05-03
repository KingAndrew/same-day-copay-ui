import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  Image,
} from "react-native";
import { URLs, Colors } from './constants'; // Importing constants

function App() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [userData, setUserData] = useState(null);

  const renderScreen = () => {
    switch (currentScreen) {
      case "login":
        return (
          <LoginScreen
            navigateTo={setCurrentScreen}
            setUserData={setUserData}
          />
        );
      case "main-menu":
        return (
          <MainMenuScreen navigateTo={setCurrentScreen} userData={userData} />
        );
      case "new-purchase":
        return <NewPurchaseScreen navigateTo={setCurrentScreen} />;
      case "account-setup":
        return <AccountSetupScreen navigateTo={setCurrentScreen} />;
      case "account-history":
        return <AccountHistoryScreen navigateTo={setCurrentScreen} />;
      case "about":
        return <AboutScreen navigateTo={setCurrentScreen} />;
      case "snap-receipt":
        return <SnapReceiptScreen navigateTo={setCurrentScreen} />;
      default:
        return <HomeScreen navigateTo={setCurrentScreen} />;
    }
  };

  return <SafeAreaView style={styles.container}>{renderScreen()}</SafeAreaView>;
}

const HomeScreen = ({ navigateTo }) => (
  <View style={styles.screen}>
    <View style={styles.box}>
      <View style={styles.logoContainer}>
        <img
          src="/images/logo.png"
          style={styles.logo}
          alt="Same Day Co-Pay Logo"
        />
      </View>
      <Text style={styles.description}>
        Welcome to the Same Day Copay mobile application
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateTo("login")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// Login screen implementation...
const LoginScreen = ({ navigateTo, setUserData }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);

  const isLoginFormValid = username.trim() !== "" && password.trim() !== "";
  const isSignupFormValid = signupEmail.trim() !== "" && signupPassword.trim() !== "";

  const handleLogin = () => {
    if (username === "David" && password === "Smith") {
      setUserData({
        username: "David Smith",
        totalRefunded: 1024.56,
      });
      navigateTo("main-menu");
    } else {
      alert("Invalid username or password. Use David/Smith for testing.");
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.box}>
        {/* Login & Signup form...*/}
      </View>
    </View>
  );
};

// Remaining screen components...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  box: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    width: "100%",
    maxWidth: 500,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: Colors.FOREST_GREEN,
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default App;