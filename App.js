import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  const renderScreen = () => {
    switch(currentScreen) {
      case 'login':
        return <LoginScreen navigateTo={setCurrentScreen} />;
      case 'main-menu':
        return <MainMenuScreen navigateTo={setCurrentScreen} />;
      case 'new-purchase':
        return <NewPurchaseScreen navigateTo={setCurrentScreen} />;
      case 'snap-receipt':
        return <SnapReceiptScreen navigateTo={setCurrentScreen} />;
      default:
        return <HomeScreen navigateTo={setCurrentScreen} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderScreen()}
    </SafeAreaView>
  );
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
        onPress={() => navigateTo('login')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const LoginScreen = ({ navigateTo }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  
  // Check if login form is valid
  const isLoginFormValid = username.trim() !== '' && password.trim() !== '';
  // Check if signup form is valid
  const isSignupFormValid = signupEmail.trim() !== '' && signupPassword.trim() !== '';
  
  return (
    <View style={styles.screen}>
      <View style={styles.box}>
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[
              styles.tabButton, 
              activeTab === 'login' && styles.activeTabButton
            ]} 
            onPress={() => setActiveTab('login')}
          >
            <Text style={[
              styles.tabButtonText, 
              activeTab === 'login' ? styles.activeTabText : styles.inactiveTabText
            ]}>
              Login
            </Text>
            {activeTab === 'login' && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tabButton, 
              activeTab === 'signup' && styles.activeTabButton
            ]} 
            onPress={() => setActiveTab('signup')}
          >
            <Text style={[
              styles.tabButtonText, 
              activeTab === 'signup' ? styles.activeTabText : styles.inactiveTabText
            ]}>
              Sign up
            </Text>
            {activeTab === 'signup' && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        </View>
        
        {activeTab === 'login' ? (
          <>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter your username"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
              />
            </View>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot your password?</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.button, 
                !isLoginFormValid && styles.disabledButton
              ]} 
              onPress={() => isLoginFormValid && navigateTo('main-menu')}
              disabled={!isLoginFormValid}
            >
              <Text style={[
                styles.buttonText,
                !isLoginFormValid && styles.disabledButtonText
              ]}>Login</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={signupEmail}
                onChangeText={setSignupEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={signupPassword}
                onChangeText={setSignupPassword}
                placeholder="Create a password"
                secureTextEntry
              />
            </View>
            <TouchableOpacity 
              style={[
                styles.button,
                !isSignupFormValid && styles.disabledButton
              ]} 
              onPress={() => isSignupFormValid && navigateTo('main-menu')}
              disabled={!isSignupFormValid}
            >
              <Text style={[
                styles.buttonText,
                !isSignupFormValid && styles.disabledButtonText
              ]}>Sign up</Text>
            </TouchableOpacity>
          </>
        )}
        
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]} 
          onPress={() => navigateTo('home')}
        >
          <Text style={styles.secondaryButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MainMenuScreen = ({ navigateTo }) => (
  <View style={styles.screen}>
    <View style={styles.box}>
      <Text style={styles.title}>Main Menu</Text>
      <ScrollView>
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigateTo('new-purchase')}
        >
          <Text style={styles.menuItemText}>New Purchase</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigateTo('snap-receipt')}
        >
          <Text style={styles.menuItemText}>Snap Receipt</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuItem}

        >
          <Text style={styles.menuItemText}>View History</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuItem} 
        >
          <Text style={styles.menuItemText}>Settings</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity 
        style={[styles.button, styles.secondaryButton]} 
        onPress={() => navigateTo('login')}
      >
        <Text style={styles.secondaryButtonText}>Logout</Text>
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
        onPress={() => navigateTo('main-menu')}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.button, styles.secondaryButton]} 
        onPress={() => navigateTo('main-menu')}
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
        onPress={() => navigateTo('main-menu')}
      >
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.button, styles.secondaryButton]} 
        onPress={() => navigateTo('main-menu')}
      >
        <Text style={styles.secondaryButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  box: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    width: '100%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333333',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1b702d',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  secondaryButtonText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '600',
  },
  menuItem: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#1b702d',
    marginBottom: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    position: 'relative',
  },
  activeTabButton: {
    borderBottomColor: '#032f54',
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat Bold, sans-serif',
  },
  activeTabText: {
    color: '#032f54',
  },
  inactiveTabText: {
    color: '#999999',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#032f54',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  forgotPassword: {
    color: '#032f54',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 16,
    textDecorationLine: 'underline',
  },
  disabledButton: {
    backgroundColor: '#1b702d',
    opacity: 0.5,
  },
  disabledButtonText: {
    opacity: 0.8,
  }
});

export default App;