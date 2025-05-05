
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/index.js';
import { AppLogo, AppButton, FormInput, TabSelector } from '../components/index.js';

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
            />
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
});

export default LoginScreen;
