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
import { URLs, Colors } from './constants';

// Reusable UI components
const AppButton = ({ onPress, text, style, textStyle, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, textStyle, disabled && styles.disabledButtonText]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const AppLogo = ({ size = 'large' }) => {
  const logoStyle = size === 'large' ? styles.logo : styles.loginLogo;
  const containerStyle = size === 'large' ? styles.logoContainer : styles.loginLogoContainer;

  return (
    <View style={containerStyle}>
      <Image
        source={{ uri: `${URLs.IMAGES}/logo.png` }}
        style={logoStyle}
        alt="Same Day Co-Pay Logo"
      />
    </View>
  );
};

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
      <AppLogo size="large" />
      <Text style={styles.description}>
        Welcome to the Same Day Copay mobile application
      </Text>
      <AppButton 
        text="Get Started" 
        onPress={() => navigateTo("login")} 
      />
    </View>
  </View>
);

// Reusable form input component
const FormInput = ({ label, value, onChangeText, placeholder, secureTextEntry = false, keyboardType = "default", inputId, focusedInput, setFocusedInput }) => (
  <View style={styles.formGroup}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[
        styles.input,
        focusedInput === inputId && styles.inputFocused,
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={Colors.MEDIUM_GRAY}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize="none"
      onFocus={() => setFocusedInput(inputId)}
      onBlur={() => setFocusedInput(null)}
    />
  </View>
);

// Tab component for login/signup
const TabSelector = ({ activeTab, setActiveTab }) => (
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
  const isSignupFormValid = signupEmail.trim() !== "" && signupPassword.trim() !== "";

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
        <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
        <AppLogo size="small" />

        {activeTab === "login" ? (
          <>
            <FormInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
              inputId="username"
              focusedInput={focusedInput}
              setFocusedInput={setFocusedInput}
            />

            <FormInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={true}
              inputId="password"
              focusedInput={focusedInput}
              setFocusedInput={setFocusedInput}
            />

            <AppButton
              text="Login"
              onPress={() => isLoginFormValid && handleLogin()}
              disabled={!isLoginFormValid}
              style={!isLoginFormValid && styles.disabledButton}
              textStyle={!isLoginFormValid && styles.disabledButtonText}
            />

            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPassword}>Forgot your password?</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <FormInput
              label="Email"
              value={signupEmail}
              onChangeText={setSignupEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              inputId="email"
              focusedInput={focusedInput}
              setFocusedInput={setFocusedInput}
            />

            <FormInput
              label="Password"
              value={signupPassword}
              onChangeText={setSignupPassword}
              placeholder="Create a password"
              secureTextEntry={true}
              inputId="newpassword"
              focusedInput={focusedInput}
              setFocusedInput={setFocusedInput}
            />

            <AppButton
              text="Sign up"
              onPress={() => isSignupFormValid && navigateTo("main-menu")}
              disabled={!isSignupFormValid}
              style={!isSignupFormValid && styles.disabledButton}
              textStyle={!isSignupFormValid && styles.disabledButtonText}
            />
          </>
        )}
      </View>
    </View>
  );
};

// Reusable menu item component
const MenuItem = ({ icon, text, onPress, chevronText = '›' }) => (
  <TouchableOpacity
    style={styles.menuItemContainer}
    onPress={onPress}
  >
    <View style={styles.menuItem}>
      <View style={styles.menuIconContainer}>
        <View style={[styles.menuIcon, { backgroundColor: Colors.NAVY_BLUE, padding: 0 }]}>
          <Image
            source={{ uri: `${URLs.IMAGES}/${icon}` }}
            style={{ width: 36, height: 36 }}
            alt={text}
          />
        </View>
      </View>
      <Text style={styles.menuItemText}>{text}</Text>
      <Text style={styles.chevron}>{chevronText}</Text>
    </View>
  </TouchableOpacity>
);

// Reusable sub-menu item component
const SubMenuItem = ({ text, onPress }) => (
  <TouchableOpacity
    style={styles.subMenuItemContainer}
    onPress={onPress}
  >
    <View style={styles.subMenuItem}>
      <Text style={styles.subMenuItemText}>{text}</Text>
      <Text style={styles.chevron}>›</Text>
    </View>
  </TouchableOpacity>
);

// Function to animate counting
const useAmountCounter = (amount) => {
  const amountAnim = useRef(new Animated.Value(0)).current;
  const [displayedAmount, setDisplayedAmount] = useState("0.00");
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio(`${URLs.AUDIO}/banknote-counter-106014.mp3`);

    // Animate the counting effect
    const totalAmount = amount || 1024.56;
    const duration = 1500; // 1.5 seconds

    // Play the sound
    audioRef.current.play().catch((e) => console.log("Audio play error:", e));

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

    return () => {
      amountAnim.removeAllListeners();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return displayedAmount;
};

const MainMenuScreen = ({ navigateTo, userData }) => {
  const [accountExpanded, setAccountExpanded] = useState(false);
  const displayedAmount = useAmountCounter(userData?.totalRefunded);

  return (
    <View style={styles.screen}>
      <View style={styles.boxFull}>
        <AppLogo size="small" />

        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.usernameText}>
          {userData?.username || "David Smith"}
        </Text>

        <Text style={styles.totalRefundedLabel}>Total Refunded</Text>
        <Text style={styles.amountText}>${displayedAmount}</Text>

        <View style={styles.menuContainer}>
          {/* New Purchase Menu Item */}
          <MenuItem 
            icon="dollar_circle_icon.png" 
            text="New Purchase" 
            onPress={() => navigateTo("new-purchase")} 
          />

          {/* Account Menu Item */}
          <MenuItem 
            icon="account_circle_icon.png" 
            text="Account" 
            onPress={() => setAccountExpanded(!accountExpanded)} 
            chevronText={accountExpanded ? "⌃" : "⌄"}
          />

          {accountExpanded && (
            <>
              <SubMenuItem 
                text="Account Setup" 
                onPress={() => navigateTo("account-setup")} 
              />
              <SubMenuItem 
                text="Account History" 
                onPress={() => navigateTo("account-history")} 
              />
            </>
          )}

          {/* About Menu Item */}
          <MenuItem 
            icon="info_ic_icon.png" 
            text="About" 
            onPress={() => navigateTo("about")} 
          />
        </View>
      </View>
    </View>
  );
};

// Reusable screen layout component
const BasicScreen = ({ title, description, children, navigateTo }) => (
  <View style={styles.screen}>
    <View style={styles.box}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {children}
      <AppButton 
        text="Back" 
        onPress={() => navigateTo("main-menu")}
        style={styles.secondaryButton}
        textStyle={styles.secondaryButtonText}
      />
    </View>
  </View>
);

const AccountSetupScreen = ({ navigateTo }) => (
  <BasicScreen 
    title="Account Setup" 
    description="Account setup placeholder" 
    navigateTo={navigateTo}
  />
);

const AccountHistoryScreen = ({ navigateTo }) => (
  <BasicScreen 
    title="Account History" 
    description="Account history placeholder" 
    navigateTo={navigateTo}
  />
);

const AboutScreen = ({ navigateTo }) => (
  <BasicScreen 
    title="About" 
    description="About page placeholder" 
    navigateTo={navigateTo}
  />
);

const NewPurchaseScreen = ({ navigateTo }) => (
  <BasicScreen 
    title="New Purchase" 
    description="New purchase form placeholder" 
    navigateTo={navigateTo}
  >
    <AppButton 
      text="Submit" 
      onPress={() => navigateTo("main-menu")}
    />
  </BasicScreen>
);

const SnapReceiptScreen = ({ navigateTo }) => (
  <BasicScreen 
    title="Snap Receipt" 
    description="Camera interface placeholder" 
    navigateTo={navigateTo}
  >
    <AppButton 
      text="Take Photo" 
      onPress={() => navigateTo("main-menu")}
    />
  </BasicScreen>
);

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
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  boxFull: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    width: "100%",
    maxWidth: 500,
    height: "100%",
    maxHeight: 800,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
    color: Colors.NAVY_BLUE,
    textAlign: "center",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "700",
  },
  description: {
    fontSize: 16,
    color: Colors.DARK_GRAY,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "700",
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
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "700",
  },
  secondaryButton: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
  },
  secondaryButtonText: {
    color: Colors.DARK_GRAY,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "700",
  },
  menuItem: {
    flexDirection: "row",
    backgroundColor: Colors.NAVY_BLUE,
    padding: 16,
    borderRadius: 6,
    alignItems: "center",
    width: "100%",
  },
  menuItemText: {
    fontSize: 16,
    color: Colors.WHITE,
    fontWeight: "500",
    flex: 1,
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "700",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LIGHT_GRAY,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    position: "relative",
  },
  activeTabButton: {
    borderBottomColor: Colors.NAVY_BLUE,
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "700",
  },
  activeTabText: {
    color: Colors.NAVY_BLUE,
  },
  inactiveTabText: {
    color: Colors.MEDIUM_GRAY,
  },
  tabIndicator: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: Colors.NAVY_BLUE,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: Colors.NAVY_BLUE,
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: Colors.WHITE,
  },
  inputFocused: {
    borderColor: Colors.FOREST_GREEN,
    borderWidth: 2,
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
    color: Colors.NAVY_BLUE,
    fontSize: 14,
    textDecorationLine: "underline",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "700",
  },
  disabledButton: {
    backgroundColor: Colors.FOREST_GREEN,
    opacity: 0.5,
  },
  disabledButtonText: {
    opacity: 0.8,
  },
  welcomeText: {
    fontSize: 28,
    color: Colors.NAVY_BLUE,
    textAlign: "center",
    marginBottom: 8,
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "700",
  },
  usernameText: {
    fontSize: 20,
    color: Colors.NAVY_BLUE,
    textAlign: "center",
    marginBottom: 24,
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "700",
  },
  totalRefundedLabel: {
    fontSize: 18,
    color: Colors.FOREST_GREEN,
    textAlign: "center",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "700",
  },
  amountText: {
    fontSize: 64,
    color: Colors.NAVY_BLUE,
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "700",
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
    color: Colors.WHITE,
    fontSize: 20,
    fontWeight: "bold",
  },
  chevron: {
    color: Colors.WHITE,
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
    backgroundColor: Colors.NAVY_BLUE,
    padding: 12,
    paddingLeft: 30,
    borderRadius: 6,
    alignItems: "center",
  },
  subMenuItemText: {
    fontSize: 14,
    color: Colors.WHITE,
    fontWeight: "500",
    flex: 1,
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "700",
  },
});

export default App;