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

const LoginScreen = ({ navigateTo, setUserData }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);

  // Check if login form is valid
  const isLoginFormValid = username.trim() !== "" && password.trim() !== "";
  // Check if signup form is valid
  const isSignupFormValid =
    signupEmail.trim() !== "" && signupPassword.trim() !== "";

  const handleLogin = () => {
    // Mock authentication
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
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "login" && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab("login")}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === "login"
                  ? styles.activeTabText
                  : styles.inactiveTabText,
              ]}
            >
              Login
            </Text>
            {activeTab === "login" && <View style={styles.tabIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "signup" && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab("signup")}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === "signup"
                  ? styles.activeTabText
                  : styles.inactiveTabText,
              ]}
            >
              Sign up
            </Text>
            {activeTab === "signup" && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        </View>

        <View style={styles.loginLogoContainer}>
          <img
            src="/images/logo.png"
            style={styles.loginLogo}
            alt="Same Day Co-Pay Logo"
          />
        </View>

        {activeTab === "login" ? (
          <>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === 'username' && styles.inputFocused
                ]}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter your username"
                placeholderTextColor="#a8a8a8"
                autoCapitalize="none"
                onFocus={() => setFocusedInput('username')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === 'password' && styles.inputFocused
                ]}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#a8a8a8"
                secureTextEntry
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.button,
                !isLoginFormValid && styles.disabledButton,
              ]}
              onPress={() => isLoginFormValid && handleLogin()}
              disabled={!isLoginFormValid}
            >
              <Text
                style={[
                  styles.buttonText,
                  !isLoginFormValid && styles.disabledButtonText,
                ]}
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPassword}>Forgot your password?</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === 'email' && styles.inputFocused
                ]}
                value={signupEmail}
                onChangeText={setSignupEmail}
                placeholder="Enter your email"
                placeholderTextColor="#a8a8a8"
                keyboardType="email-address"
                autoCapitalize="none"
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === 'newpassword' && styles.inputFocused
                ]}
                value={signupPassword}
                onChangeText={setSignupPassword}
                placeholder="Create a password"
                placeholderTextColor="#a8a8a8"
                secureTextEntry
                onFocus={() => setFocusedInput('newpassword')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.button,
                !isSignupFormValid && styles.disabledButton,
              ]}
              onPress={() => isSignupFormValid && navigateTo("main-menu")}
              disabled={!isSignupFormValid}
            >
              <Text
                style={[
                  styles.buttonText,
                  !isSignupFormValid && styles.disabledButtonText,
                ]}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const MainMenuScreen = ({ navigateTo, userData }) => {
  const [accountExpanded, setAccountExpanded] = useState(false);
  const amountAnim = useRef(new Animated.Value(0)).current;
  const [displayedAmount, setDisplayedAmount] = useState("0.00");

  useEffect(() => {
    // Animate the counting effect
    const totalAmount = userData?.totalRefunded || 1024.56;
    const duration = 1500; // 1.5 seconds

    Animated.timing(amountAnim, {
      toValue: totalAmount * 100, // Convert to cents for smoother animation
      duration: duration,
      useNativeDriver: false,
    }).start();

    // Update displayed value during animation
    const updateCounter = () => {
      const interval = setInterval(() => {
        amountAnim.addListener(({ value }) => {
          setDisplayedAmount((value / 100).toFixed(2));
        });
      }, 16); // ~60fps

      // Clean up
      setTimeout(() => {
        clearInterval(interval);
        setDisplayedAmount(totalAmount.toFixed(2));
      }, duration);
    };

    updateCounter();

    return () => amountAnim.removeAllListeners();
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.boxFull}>
        <View style={styles.loginLogoContainer}>
          <img
            src="/images/logo.png"
            style={styles.loginLogo}
            alt="Same Day Co-Pay Logo"
          />
        </View>

        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.usernameText}>
          {userData?.username || "David Smith"}
        </Text>

        <Text style={styles.totalRefundedLabel}>Total Refunded</Text>
        <Text style={styles.amountText}>${displayedAmount}</Text>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItemContainer}
            onPress={() => navigateTo("new-purchase")}
          >
            <View style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <View style={[styles.menuIcon, { backgroundColor: "#1b702d" }]}>
                  <Text style={styles.iconText}>+</Text>
                </View>
              </View>
              <Text style={styles.menuItemText}>New Purchase</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItemContainer}
            onPress={() => setAccountExpanded(!accountExpanded)}
          >
            <View style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <View style={[styles.menuIcon, { backgroundColor: "#032f54" }]}>
                  <Text style={styles.iconText}>@</Text>
                </View>
              </View>
              <Text style={styles.menuItemText}>Account</Text>
              <Text style={styles.chevron}>{accountExpanded ? "⌃" : "⌄"}</Text>
            </View>
          </TouchableOpacity>

          {accountExpanded && (
            <>
              <TouchableOpacity
                style={styles.subMenuItemContainer}
                onPress={() => navigateTo("account-setup")}
              >
                <View style={styles.subMenuItem}>
                  <Text style={styles.subMenuItemText}>Account Setup</Text>
                  <Text style={styles.chevron}>›</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subMenuItemContainer}
                onPress={() => navigateTo("account-history")}
              >
                <View style={styles.subMenuItem}>
                  <Text style={styles.subMenuItemText}>Account History</Text>
                  <Text style={styles.chevron}>›</Text>
                </View>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity
            style={styles.menuItemContainer}
            onPress={() => navigateTo("about")}
          >
            <View style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <View style={[styles.menuIcon, { backgroundColor: "#1b702d" }]}>
                  <Text style={styles.iconText}>i</Text>
                </View>
              </View>
              <Text style={styles.menuItemText}>About</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const AccountSetupScreen = ({ navigateTo }) => (
  <View style={styles.screen}>
    <View style={styles.box}>
      <Text style={styles.title}>Account Setup</Text>
      <Text style={styles.description}>Account setup placeholder</Text>
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigateTo("main-menu")}
      >
        <Text style={styles.secondaryButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const AccountHistoryScreen = ({ navigateTo }) => (
  <View style={styles.screen}>
    <View style={styles.box}>
      <Text style={styles.title}>Account History</Text>
      <Text style={styles.description}>Account history placeholder</Text>
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigateTo("main-menu")}
      >
        <Text style={styles.secondaryButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const AboutScreen = ({ navigateTo }) => (
  <View style={styles.screen}>
    <View style={styles.box}>
      <Text style={styles.title}>About</Text>
      <Text style={styles.description}>About page placeholder</Text>
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigateTo("main-menu")}
      >
        <Text style={styles.secondaryButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const NewPurchaseScreen = ({ navigateTo }) => (
  <View style={styles.screen}>
    <View style={styles.box}>
      <Text style={styles.title}>New Purchase</Text>
      <Text style={styles.description}>New purchase form placeholder</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateTo("main-menu")}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigateTo("main-menu")}
      >
        <Text style={styles.secondaryButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const SnapReceiptScreen = ({ navigateTo }) => (
  <View style={styles.screen}>
    <View style={styles.box}>
      <Text style={styles.title}>Snap Receipt</Text>
      <Text style={styles.description}>Camera interface placeholder</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateTo("main-menu")}
      >
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigateTo("main-menu")}
      >
        <Text style={styles.secondaryButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    width: "100%",
    maxWidth: 500,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  boxFull: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    width: "100%",
    maxWidth: 500,
    height: "100%",
    maxHeight: 800,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
    color: "#032f54",
    textAlign: "center",
    fontFamily: "Montserrat Bold, sans-serif",
  },
  description: {
    fontSize: 16,
    color: "#666666",
    lineHeight: 24,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Montserrat Bold, sans-serif",
  },
  button: {
    backgroundColor: "#1b702d",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Montserrat Bold, sans-serif",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
  secondaryButtonText: {
    color: "#666666",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Montserrat Bold, sans-serif",
  },
  menuItem: {
    flexDirection: "row",
    backgroundColor: "#F8F8F8",
    padding: 16,
    borderRadius: 6,
    alignItems: "center",
    width: "100%",
  },
  menuItemText: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
    flex: 1,
    fontFamily: "Montserrat Bold, sans-serif",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    position: "relative",
  },
  activeTabButton: {
    borderBottomColor: "#032f54",
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Montserrat Bold, sans-serif",
  },
  activeTabText: {
    color: "#032f54",
  },
  inactiveTabText: {
    color: "#999999",
  },
  tabIndicator: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#032f54",
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#032f54",
    fontFamily: "Montserrat Bold, sans-serif",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
  },
  inputFocused: {
    borderColor: "#1b702d",
  },
  loginLogoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  loginLogo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  forgotPasswordContainer: {
    alignSelf: "center",
    marginTop: 12,
  },
  forgotPassword: {
    color: "#032f54",
    fontSize: 14,
    textDecorationLine: "underline",
    fontFamily: "Montserrat Bold, sans-serif",
  },
  disabledButton: {
    backgroundColor: "#1b702d",
    opacity: 0.5,
  },
  disabledButtonText: {
    opacity: 0.8,
  },
  welcomeText: {
    fontSize: 28,
    color: "#032f54",
    textAlign: "center",
    marginBottom: 8,
    fontFamily: "Montserrat Bold, sans-serif",
  },
  usernameText: {
    fontSize: 20,
    color: "#032f54",
    textAlign: "center",
    marginBottom: 24,
    fontFamily: "Montserrat Bold, sans-serif",
  },
  totalRefundedLabel: {
    fontSize: 18,
    color: "#1b702d",
    textAlign: "center",
    fontFamily: "Montserrat Bold, sans-serif",
  },
  amountText: {
    fontSize: 64,
    color: "#032f54",
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "Montserrat Bold, sans-serif",
  },
  menuContainer: {
    width: "100%",
  },
  menuItemContainer: {
    marginBottom: 12,
    width: "100%",
  },
  menuIconContainer: {
    marginRight: 15,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  chevron: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  subMenuItemContainer: {
    marginBottom: 12,
    width: "90%",
    alignSelf: "flex-end",
  },
  subMenuItem: {
    flexDirection: "row",
    backgroundColor: "#F8F8F8",
    padding: 12,
    paddingLeft: 30,
    borderRadius: 6,
    alignItems: "center",
  },
  subMenuItemText: {
    fontSize: 14,
    color: "white",
    fontWeight: "500",
    flex: 1,
    fontFamily: "Montserrat Bold, sans-serif",
  },
});

export default App;
