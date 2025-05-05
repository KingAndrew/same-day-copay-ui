
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FormInput, AppButton, AppLogo, TabSelector } from '../components/index.js';
import { Colors } from '../constants/index.js';

const LoginScreen = ({ 
  navigateTo = (screen) => console.warn(`Navigation to "${screen}" attempted but no navigateTo function provided`),
  setUserData = (data) => console.warn("setUserData attempted but no function provided", data)
}) => {
  const [activeTab, setActiveTab] = useState("signup"); // Default to signup screen
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // Signup form state
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  
  // Form focus state
  const [focusedInput, setFocusedInput] = useState(null);
  
  // Validation states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
  
  // Password validation criteria states
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecial, setHasSpecial] = useState(false);
  
  // Password visibility states
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Email validation
  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Password validation - fixed to return validation results without setting state
  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNum = /\d/.test(password);
    const hasSpec = /[@$!%*?&]/.test(password);
    
    return {
      isValid: minLength && hasUpper && hasLower && hasNum && hasSpec,
      minLength,
      hasUpper,
      hasLower, 
      hasNum,
      hasSpec
    };
  };

  // Check if emails are valid on change
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

  // Check if passwords meet requirements on change
  useEffect(() => {
    if (signupPassword) {
      const validationResult = validatePassword(signupPassword);
      
      // Update all password validation states
      setHasMinLength(validationResult.minLength);
      setHasUppercase(validationResult.hasUpper);
      setHasLowercase(validationResult.hasLower);
      setHasNumber(validationResult.hasNum);
      setHasSpecial(validationResult.hasSpec);
      
      if (!validationResult.isValid) {
        setPasswordError("Password does not meet requirements");
      } else {
        setPasswordError("");
      }
    } else {
      setPasswordError("");
      // Reset validation states when password is empty
      setHasMinLength(false);
      setHasUppercase(false);
      setHasLowercase(false);
      setHasNumber(false);
      setHasSpecial(false);
    }
  }, [signupPassword]);

  // Check if login form is valid
  const isLoginFormValid = username.trim() !== "" && password.trim() !== "";
  
  // Check if signup form is valid
  const isSignupFormValid =
    signupFirstName.trim() !== "" && 
    signupLastName.trim() !== "" && 
    signupEmail.trim() !== "" && 
    validateEmail(signupEmail) &&
    signupPassword.trim() !== "" && 
    validatePassword(signupPassword).isValid &&
    signupConfirmPassword === signupPassword;

  const handleLogin = () => {
    // Mock authentication
    if (username === "David" && password === "Smith") {
      setUserData({
        username: "David Smith",
        email: "david.smith@example.com",
        firstName: "David",
        lastName: "Smith",
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
        username: `${signupFirstName} ${signupLastName}`,
        firstName: signupFirstName,
        lastName: signupLastName,
        email: signupEmail,
        totalRefunded: 0,
      });
      // Navigate to main menu after successful signup
      navigateTo("main-menu");
    }
  };

  // Password tooltip component
  const PasswordRequirementItem = ({ met, text }) => (
    <View style={styles.requirementRow}>
      <Text style={[styles.checkmark, met ? styles.validRequirement : {}]}>
        {met ? '✓' : '○'}
      </Text>
      <Text style={[styles.requirementText, met ? styles.validRequirement : {}]}>
        {text}
      </Text>
    </View>
  );

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
              secureTextEntry={!showLoginPassword}
              inputId="password"
              focusedInput={focusedInput}
              setFocusedInput={setFocusedInput}
              rightIcon={
                <TouchableOpacity onPress={() => setShowLoginPassword(!showLoginPassword)}>
                  <Text style={styles.visibilityIcon}>{showLoginPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              }
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
              label="First Name"
              value={signupFirstName}
              onChangeText={setSignupFirstName}
              placeholder="Enter your first name"
              inputId="firstName"
              focusedInput={focusedInput}
              setFocusedInput={setFocusedInput}
            />

            <FormInput
              label="Last Name"
              value={signupLastName}
              onChangeText={setSignupLastName}
              placeholder="Enter your last name"
              inputId="lastName"
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

            <FormInput
              label="Password"
              value={signupPassword}
              onChangeText={setSignupPassword}
              placeholder="Create a password"
              secureTextEntry={!showSignupPassword}
              inputId="password"
              focusedInput={focusedInput}
              setFocusedInput={setFocusedInput}
              error={passwordError}
              onFocus={() => setShowPasswordTooltip(true)}
              onBlur={() => setShowPasswordTooltip(false)}
              rightIcon={
                <TouchableOpacity onPress={() => setShowSignupPassword(!showSignupPassword)}>
                  <Text style={styles.visibilityIcon}>{showSignupPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              }
            />

            {showPasswordTooltip && (
              <View style={styles.passwordTooltip}>
                <Text style={styles.tooltipTitle}>Password must have:</Text>
                <PasswordRequirementItem 
                  met={hasMinLength} 
                  text="At least 8 characters" 
                />
                <PasswordRequirementItem 
                  met={hasUppercase} 
                  text="At least 1 uppercase letter" 
                />
                <PasswordRequirementItem 
                  met={hasLowercase} 
                  text="At least 1 lowercase letter" 
                />
                <PasswordRequirementItem 
                  met={hasNumber} 
                  text="At least 1 number" 
                />
                <PasswordRequirementItem 
                  met={hasSpecial} 
                  text="At least 1 special character (@$!%*?&)" 
                />
              </View>
            )}

            <FormInput
              label="Confirm Password"
              value={signupConfirmPassword}
              onChangeText={setSignupConfirmPassword}
              placeholder="Confirm your password"
              secureTextEntry={!showConfirmPassword}
              inputId="confirmpassword"
              focusedInput={focusedInput}
              setFocusedInput={setFocusedInput}
              error={signupConfirmPassword && signupPassword !== signupConfirmPassword ? "Passwords do not match" : ""}
              rightIcon={
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Text style={styles.visibilityIcon}>{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              }
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
    marginTop: 10,
    alignItems: "center",
  },
  forgotPassword: {
    color: Colors.NAVY_BLUE,
    textDecorationLine: "underline",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "500",
  },
  termsText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 12,
    color: Colors.TEXT_SECONDARY,
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "400",
  },
  passwordTooltip: {
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  tooltipTitle: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 5,
    color: Colors.TEXT_PRIMARY,
    fontFamily: "Montserrat, sans-serif",
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  checkmark: {
    marginRight: 6,
    fontSize: 14,
    color: Colors.TEXT_PRIMARY,
    fontWeight: 'bold',
  },
  requirementText: {
    fontSize: 12,
    color: Colors.TEXT_PRIMARY,
    fontFamily: "Montserrat, sans-serif",
  },
  validRequirement: {
    color: Colors.FOREST_GREEN,
    fontWeight: '600',
  },
  visibilityIcon: {
    fontSize: 20,
    padding: 5,
    color: Colors.NAVY_BLUE,
  }
});

export default LoginScreen;
