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
import { URLs, Colors } from "./constants";

// Reusable UI components
const AppButton = ({ onPress, text, style, textStyle, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.buttonText,
          textStyle,
          disabled && styles.disabledButtonText,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const AppLogo = ({ size = "large" }) => {
  const logoStyle = size === "large" ? styles.logo : styles.loginLogo;
  const containerStyle =
    size === "large" ? styles.logoContainer : styles.loginLogoContainer;

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
      <AppButton text="Get Started" onPress={() => navigateTo("login")} />
    </View>
  </View>
);

// Reusable form input component
const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  inputId,
  focusedInput,
  setFocusedInput,
}) => (
  <View style={styles.formGroup}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, focusedInput === inputId && styles.inputFocused]}
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
const TabSelector = ({ activeTab, setActiveTab }) => {
  // Animation ref to track position
  const [indicatorLeft, setIndicatorLeft] = useState(activeTab === "login" ? "0%" : "50%");
  
  // Update indicator position with animation effect
  useEffect(() => {
    setIndicatorLeft(activeTab === "login" ? "0%" : "50%");
  }, [activeTab]);

  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => setActiveTab("login")}
      >
        <Text
          style={[
            styles.tabButtonText,
            activeTab === "login" ? styles.activeTabText : styles.inactiveTabText,
          ]}
        >
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => setActiveTab("signup")}
      >
        <Text
          style={[
            styles.tabButtonText,
            activeTab === "signup" ? styles.activeTabText : styles.inactiveTabText,
          ]}
        >
          Sign up
        </Text>
      </TouchableOpacity>
      
      {/* Sliding indicator */}
      <View 
        style={[
          styles.tabIndicator, 
          { left: indicatorLeft, transition: "all 0.3s ease-in-out" }
        ]} 
      />
    </View>
  );
};

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
        <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
        <AppLogo size="medium" />

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
const MenuItem = ({ icon, text, onPress, chevronText = "›" }) => (
  <TouchableOpacity style={styles.menuItemContainer} onPress={onPress}>
    <View style={styles.menuItem}>
      <View style={styles.menuIconContainer}>
        <View
          style={[
            styles.menuIcon,
            { backgroundColor: Colors.NAVY_BLUE, padding: 0 },
          ]}
        >
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
const SubMenuItem = ({ text, onPress, icon }) => (
  <TouchableOpacity style={styles.subMenuItemContainer} onPress={onPress}>
    <View style={styles.subMenuItem}>
      {icon && (
        <View style={styles.subMenuIconContainer}>
          <Image
            source={{uri: icon === "settings_icon.png" ? "/images/settings_icon.png" : "/images/history.png"}}
            style={styles.subMenuIcon}
            alt={text}
          />
        </View>
      )}
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
        <AppLogo size="medium" />

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
                icon="settings_icon.png"
              />
              <SubMenuItem
                text="Account History"
                onPress={() => navigateTo("account-history")}
                icon="history.png"
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
  <View style={styles.screen}>
    <View style={styles.boxFull}>
      <Text style={styles.title}>Account History</Text>
      <Image 
        source={{ uri: `${URLs.IMAGES}/history.png` }} 
        style={styles.historyImage} 
        alt="Account History"
      />
      <AppButton
        text="Back"
        onPress={() => navigateTo("main-menu")}
        style={styles.secondaryButton}
        textStyle={styles.secondaryButtonText}
      />
    </View>
  </View>
);

const AboutScreen = ({ navigateTo }) => (
  <BasicScreen
    title="About"
    description="About page placeholder"
    navigateTo={navigateTo}
  />
);

const NewPurchaseScreen = ({ navigateTo }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [frontReceiptImage, setFrontReceiptImage] = useState(null);
  const [backReceiptImage, setBackReceiptImage] = useState(null);
  const [isFormComplete, setIsFormComplete] = useState(false);
  
  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      navigateTo("main-menu");
    }
  };
  
  return (
    <View style={styles.screen}>
      <View style={styles.box}>
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: `${URLs.IMAGES}/logo.png` }}
            style={styles.newPurchaseLogo}
            alt="Same Day Co-Pay Logo"
          />
          <Text style={styles.title}>New Purchase</Text>
        </View>
        
        {/* Steps as Blue Menu Items */}
        <View style={styles.stepsMenuContainer}>
          {/* Step 1 */}
          <TouchableOpacity 
            style={[styles.stepMenuItem, currentStep === 1 && styles.activeStepMenu]} 
            onPress={() => setCurrentStep(1)}
          >
            <View style={styles.stepMenuContent}>
              <View style={[styles.stepCircle, currentStep >= 1 && styles.activeStep]}>
                <Text style={styles.stepNumber}>1</Text>
              </View>
              <Text style={styles.stepMenuText}>Snap Receipt</Text>
            </View>
            
            {(frontReceiptImage || backReceiptImage) && (
              <View style={styles.receiptThumbnailsContainer}>
                {frontReceiptImage && (
                  <Image 
                    source={{ uri: frontReceiptImage }} 
                    style={styles.receiptThumbnail} 
                    alt="Front receipt"
                  />
                )}
                {backReceiptImage && (
                  <Image 
                    source={{ uri: backReceiptImage }} 
                    style={styles.receiptThumbnail} 
                    alt="Back receipt"
                  />
                )}
              </View>
            )}
          </TouchableOpacity>
          
          {/* Step 2 */}
          <TouchableOpacity 
            style={[styles.stepMenuItem, currentStep === 2 && styles.activeStepMenu]} 
            onPress={() => frontReceiptImage && backReceiptImage && setCurrentStep(2)}
            disabled={!frontReceiptImage || !backReceiptImage}
          >
            <View style={styles.stepMenuContent}>
              <View style={[styles.stepCircle, currentStep >= 2 && styles.activeStep]}>
                <Text style={styles.stepNumber}>2</Text>
              </View>
              <Text style={styles.stepMenuText}>Verify Details</Text>
            </View>
          </TouchableOpacity>
          
          {/* Step 3 */}
          <TouchableOpacity 
            style={[styles.stepMenuItem, currentStep === 3 && styles.activeStepMenu]} 
            onPress={() => currentStep >= 2 && setCurrentStep(3)}
            disabled={currentStep < 2}
          >
            <View style={styles.stepMenuContent}>
              <View style={[styles.stepCircle, currentStep >= 3 && styles.activeStep]}>
                <Text style={styles.stepNumber}>3</Text>
              </View>
              <Text style={styles.stepMenuText}>Request Refund</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        {/* Step Content Area */}
        <View style={styles.stepContentArea}>
          {currentStep === 1 && (
            <View style={styles.snapReceiptContainer}>
              {(!frontReceiptImage || !backReceiptImage) && (
                <AppButton 
                  text={!frontReceiptImage ? "Snap Front of Receipt" : "Snap Back of Receipt"} 
                  onPress={() => navigateTo("snap-receipt")} 
                />
              )}
              
              {frontReceiptImage && backReceiptImage && (
                <Text style={styles.receiptCapturedText}>
                  Receipt captured successfully! Proceed to verify details.
                </Text>
              )}
            </View>
          )}
          
          {currentStep === 2 && (
            <View>
              <Text style={styles.detailsText}>
                Please verify the receipt details are correct
              </Text>
              {/* Here would go the form fields for receipt details */}
            </View>
          )}
          
          {currentStep === 3 && (
            <View>
              <Text style={styles.detailsText}>
                Submit your refund request
              </Text>
              {/* Here would go final confirmation details */}
            </View>
          )}
        </View>
        
        <View style={styles.buttonsRow}>
          <AppButton
            text="Cancel" 
            onPress={() => navigateTo("main-menu")} 
            style={styles.cancelButton}
            textStyle={styles.cancelButtonText}
          />
          
          <AppButton 
            text={currentStep === 3 ? "Submit" : "Continue"} 
            onPress={currentStep === 3 ? () => navigateTo("main-menu") : handleContinue} 
            disabled={currentStep === 1 && (!frontReceiptImage || !backReceiptImage)}
            style={(currentStep === 1 && (!frontReceiptImage || !backReceiptImage)) ? styles.disabledButton : {}}
            textStyle={(currentStep === 1 && (!frontReceiptImage || !backReceiptImage)) ? styles.disabledButtonText : {}}
          />
        </View>
      </View>
    </View>
  );
};

const SnapReceiptScreen = ({ navigateTo }) => {
  const [photoTaken, setPhotoTaken] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentTimestamp, setCurrentTimestamp] = useState('');
  const [isFrontSide, setIsFrontSide] = useState(true);
  
  // Simulate camera access by setting states
  useEffect(() => {
    // Request camera permission would happen here in a real app
    console.log("Requesting camera access...");
    
    // Cleanup function
    return () => {
      // Release camera would happen here
      console.log("Releasing camera...");
    };
  }, []);
  
  const handleTakePhoto = () => {
    // Simulate taking a photo
    setPhotoTaken(true);
    setShowConfirmation(true);
    
    // Create timestamp for the image
    const now = new Date();
    const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    setCurrentTimestamp(timestamp);
  };
  
  const handleConfirmPhoto = () => {
    // In a real implementation, we would save the photo
    // For now, simulate this with a mock receipt image path
    const mockedReceiptImagePath = `${URLs.IMAGES}/snap-receipt.png`;
    
    // Navigation would include parameters in a real app
    // Here we'll navigate back to new-purchase
    setPhotoTaken(false);
    setShowConfirmation(false);
    
    if (isFrontSide) {
      // We've captured the front, now get the back
      setIsFrontSide(false);
    } else {
      // We've captured both sides, go back to main screen
      setIsFrontSide(true);
      navigateTo("new-purchase");
    }
  };
  
  const handleRetakePhoto = () => {
    setPhotoTaken(false);
    setShowConfirmation(false);
  };
  
  return (
    <View style={styles.screen}>
      <View style={styles.boxFull}>
        <Text style={styles.title}>
          Snap {isFrontSide ? "Front" : "Back"} of Receipt
        </Text>
        
        <View style={styles.cameraPreviewContainer}>
          {showConfirmation ? (
            <View style={styles.confirmationContainer}>
              <Image 
                source={{ uri: `${URLs.IMAGES}/snap-receipt.png` }} 
                style={styles.cameraPreview} 
                alt="Captured image"
              />
              <Text style={styles.timestampText}>Captured: {currentTimestamp}</Text>
              <Text style={styles.confirmationQuestion}>
                Is this image of the {isFrontSide ? "front" : "back"} clear?
              </Text>
              
              <View style={styles.confirmationButtonsRow}>
                <AppButton 
                  text="Retake" 
                  onPress={handleRetakePhoto}
                  style={styles.secondaryButton}
                  textStyle={styles.secondaryButtonText}
                />
                <AppButton 
                  text="Continue" 
                  onPress={handleConfirmPhoto}
                />
              </View>
            </View>
          ) : (
            <>
              <Image 
                source={{ uri: `${URLs.IMAGES}/snap-receipt.png` }} 
                style={styles.cameraPreview} 
                alt="Camera preview"
              />
              <Text style={styles.cameraInstructions}>
                Position the {isFrontSide ? "front" : "back"} of your receipt within the frame
              </Text>
            </>
          )}
        </View>
        
        {!showConfirmation && (
          <View style={styles.cameraControlsContainer}>
            <AppButton 
              text="Take Photo" 
              onPress={handleTakePhoto} 
            />
            
            <AppButton
              text="Cancel" 
              onPress={() => navigateTo("new-purchase")} 
              style={styles.secondaryButton}
              textStyle={styles.secondaryButtonText}
            />
          </View>
        )}
      </View>
    </View>
  );
};

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
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
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
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    elevation: 3,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    position: "relative",
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.LIGHT_GRAY,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  activeStep: {
    backgroundColor: Colors.FOREST_GREEN,
  },
  stepNumber: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Montserrat, sans-serif",
  },
  stepText: {
    fontSize: 16,
    color: Colors.DARK_GRAY,
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "600",
  },
  stepSeparator: {
    height: 30,
    width: 1,
    backgroundColor: Colors.LIGHT_GRAY,
    marginLeft: 18,
  },
  buttonContainer: {
    marginTop: 30,
  },
  receiptThumbnailContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  receiptThumbnail: {
    width: 60,
    height: 80,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
  },
  cameraPreviewContainer: {
    width: "100%",
    height: 400,
    marginVertical: 20,
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 8,
    overflow: "hidden",
  },
  cameraPreview: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  cameraControlsContainer: {
    width: "100%",
    marginTop: 20,
  },
  historyImage: {
    width: "100%",
    height: 500,
    resizeMode: "contain",
    marginVertical: 20,
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
    position: "relative",
    height: 36,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
  },
  tabButtonText: {
    fontSize: 14,
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "500",
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
    width: "50%",
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
    marginBottom: 30,
    marginTop: 10,
  },
  loginLogo: {
    width: 160,
    height: 160,
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
  subMenuIconContainer: {
    marginRight: 10,
  },
  subMenuIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.WHITE,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  newPurchaseLogo: {
    width: 100, // Increased size 2x from 50
    height: 100, // Increased size 2x from 50
    resizeMode: "contain",
    marginRight: 15,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    width: "100%",
  },
  cancelButton: {
    backgroundColor: Colors.CORAL_RED,
    flex: 1,
    marginRight: 10,
  },
  cancelButtonText: {
    color: Colors.WHITE,
  },
  snapButtonContainer: {
    marginTop: 15,
    width: "100%",
  },
  // New styles for the menu-style steps
  stepsMenuContainer: {
    width: "100%",
    marginBottom: 20,
  },
  stepMenuItem: {
    flexDirection: "column",
    backgroundColor: Colors.NAVY_BLUE,
    padding: 16,
    borderRadius: 6,
    marginBottom: 12,
    width: "100%",
  },
  activeStepMenu: {
    backgroundColor: Colors.SKY_BLUE,
  },
  stepMenuContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepMenuText: {
    fontSize: 16,
    color: Colors.WHITE,
    fontWeight: "500",
    flex: 1,
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "700",
  },
  receiptThumbnailsContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-start",
  },
  receiptThumbnail: {
    width: 60,
    height: 80,
    borderRadius: 4,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.WHITE,
  },
  stepContentArea: {
    padding: 15,
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 6,
    minHeight: 150,
    marginBottom: 20,
  },
  snapReceiptContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  receiptCapturedText: {
    fontSize: 16,
    color: Colors.FOREST_GREEN,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "Montserrat, sans-serif",
  },
  detailsText: {
    fontSize: 16,
    color: Colors.NAVY_BLUE,
    fontWeight: "600",
    fontFamily: "Montserrat, sans-serif",
  },
  // New styles for the SnapReceiptScreen
  confirmationContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  timestampText: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    color: Colors.WHITE,
    padding: 5,
    borderRadius: 3,
    fontSize: 12,
  },
  confirmationQuestion: {
    fontSize: 18,
    color: Colors.NAVY_BLUE,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 15,
    fontFamily: "Montserrat, sans-serif",
  },
  confirmationButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cameraInstructions: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    color: Colors.WHITE,
    padding: 10,
    fontSize: 14,
    fontFamily: "Montserrat, sans-serif",
  },
});

export default App;
