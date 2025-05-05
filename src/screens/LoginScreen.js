
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Tooltip } from 'react-native';
import { Colors } from '../constants/index.js';
import { AppLogo, AppButton, FormInput, TabSelector } from '../components/index.js';

const LoginScreen = ({ 
  navigateTo = (screen) => console.warn(`Navigation to "${screen}" attempted but no navigateTo function provided`),
  setUserData = (data) => console.warn("setUserData attempted but no function provided", data)
}) => {
  const [activeTab, setActiveTab] = useState("signup"); // Default to signup screen
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState(""); 
  const [signupName, setSignupName] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);

  // Email validation
  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Password validation
  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  useEffect(() => {
    if (signupEmail) {
      if (!validateEmail(signupEmail)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("");
    }
  }, [signupEmail]);

  useEffect(() => {
    if (signupPassword) {
      if (!validatePassword(signupPassword)) {
        setPasswordError("Password does not meet requirements");
      } else {
        setPasswordError("");
      }
    } else {
      setPasswordError("");
    }
  }, [signupPassword]);

  // Check if login form is valid
  const isLoginFormValid = username.trim() !== "" && password.trim() !== "";
  
  // Check if signup form is valid
  const isSignupFormValid =
    signupEmail.trim() !== "" && 
    validateEmail(signupEmail) &&
    signupPassword.trim() !== "" && 
    validatePassword(signupPassword) &&
    signupConfirmPassword === signupPassword &&
    signupName.trim() !== "";

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

  const handleSignup = () => {
    if (isSignupFormValid) {
      // Save the new user data
      setUserData({
        username: signupName,
        email: signupEmail,
        totalRefunded: 0,
      });
      // Navigate to main menu after successful signup
      navigateTo("main-menu");
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
            />

            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPassword}>Forgot your password?</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <FormInput
              label="Full Name"
              value={signupName}
              onChangeText={setSignupName}
              placeholder="Enter your full name"
              inputId="fullname"
              focusedInput={focusedInput}
              setFocusedInput={setFocusedInput}
            />

            <FormInput
              label="Email"
              value={signupEmail}
              onChangeText={setSignupEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              inputId="email"
              focusedInput={focusedInput}
              setFocusedInput={setFocusedInput}
              error={emailError}
            />

            <View>
              <FormInput
                label="Password"
                value={signupPassword}
                onChangeText={setSignupPassword}
                placeholder="Create a password"
                secureTextEntry={true}
                inputId="newpassword"
                focusedInput={focusedInput}
                setFocusedInput={setFocusedInput}
                error={passwordError}
                onFocus={() => setShowPasswordTooltip(true)}
                onBlur={() => setShowPasswordTooltip(false)}
              />
              
              {showPasswordTooltip && (
                <View style={styles.tooltipContainer}>
                  <Text style={styles.tooltipTitle}>Password must contain:</Text>
                  <Text style={styles.tooltipText}>• At least 8 characters</Text>
                  <Text style={styles.tooltipText}>• At least 1 uppercase letter</Text>
                  <Text style={styles.tooltipText}>• At least 1 lowercase letter</Text>
                  <Text style={styles.tooltipText}>• At least 1 number</Text>
                  <Text style={styles.tooltipText}>• At least 1 special character (@$!%*?&)</Text>
                </View>
              )}
            </View>

            <FormInput
              label="Confirm Password"
              value={signupConfirmPassword}
              onChangeText={setSignupConfirmPassword}
              placeholder="Confirm your password"
              secureTextEntry={true}
              inputId="confirmpassword"
              focusedInput={focusedInput}
              setFocusedInput={setFocusedInput}
              error={signupConfirmPassword && signupPassword !== signupConfirmPassword ? "Passwords do not match" : ""}
            />

            <AppButton
              text="Sign up"
              onPress={handleSignup}
              disabled={!isSignupFormValid}
            />
            
            <Text style={styles.termsText}>
              By signing up, you agree to our Terms of Service and Privacy Policy
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
  tooltipContainer: {
    backgroundColor: Colors.NAVY_BLUE,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 15,
  },
  tooltipTitle: {
    color: Colors.WHITE,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "Montserrat, sans-serif",
  },
  tooltipText: {
    color: Colors.WHITE,
    fontSize: 12,
    marginBottom: 3,
    fontFamily: "Montserrat, sans-serif",
  },
  termsText: {
    fontSize: 12,
    color: Colors.NAVY_BLUE,
    textAlign: "center",
    marginTop: 15,
    fontFamily: "Montserrat, sans-serif",
  },
});

export default LoginScreen;
