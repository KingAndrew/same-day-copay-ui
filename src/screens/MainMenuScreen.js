import React, { useState, useRef, useEffect } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { Colors, URLs } from "../constants";
import { AppLogo, MenuItem, SubMenuItem } from "../components";

// Function to animate counting
const useAmountCounter = (amount) => {
  const amountAnim = useRef(new Animated.Value(0)).current;
  const [displayedAmount, setDisplayedAmount] = useState("0.00");
  const audioRef = useRef(null);
  const isReadyRef = useRef(false);

  useEffect(() => {
    // Initialize audio and prepare it before starting animation
    audioRef.current = new Audio(`${URLs.AUDIO}/banknote-counter-106014.mp3`);

    // Preload the audio to ensure it's ready to play instantly
    audioRef.current.load();

    const totalAmount = amount || 1024.56;
    const duration = 1500; // 1.5 seconds

    // Create the animation but don't start it yet
    const animation = Animated.timing(amountAnim, {
      toValue: totalAmount * 100, // Convert to cents for smoother animation
      duration: duration,
      useNativeDriver: false,
    });

    // Setup counter update mechanism
    const updateCounter = () => {
      const listenerCallback = ({ value }) => {
        setDisplayedAmount((value / 100).toFixed(2));
      };

      amountAnim.addListener(listenerCallback);

      // Set final value when animation completes
      setTimeout(() => {
        setDisplayedAmount(totalAmount.toFixed(2));
        amountAnim.removeListener(listenerCallback);
      }, duration);
    };

    // Start both audio and animation together
    const startSync = () => {
      // Play audio and immediately start animation
      const playPromise = audioRef.current.play();

      // Handle both success and failure of audio playback
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Audio started successfully
            animation.start();
            updateCounter();
          })
          .catch((error) => {
            // Audio failed to play (perhaps due to browser restrictions)
            console.log("Audio play error:", error);
            // Still start the animation even if audio fails
            animation.start();
            updateCounter();
          });
      } else {
        // Fallback for browsers that don't return a promise from play()
        animation.start();
        updateCounter();
      }
    };

    // Start everything together
    startSync();

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

const MainMenuScreen = ({ 
  navigateTo = (screen) => console.warn(`Navigation to "${screen}" attempted but no navigateTo function provided`), 
  userData = { username: "Guest User", totalRefunded: 0 } 
}) => {
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
                icon="settings_icon.png"
                text="Account Setup"
                onPress={() => navigateTo("account-setup")}
              />
              <SubMenuItem
                icon="history.png"
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
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
  welcomeText: {
    fontSize: 24,
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
    fontSize: 28,
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
});

export default MainMenuScreen;
