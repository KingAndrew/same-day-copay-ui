import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/index.js';
import { AppLogo, AppButton } from '../components/index.js';

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
  description: {
    fontSize: 16,
    color: Colors.DARK_GRAY,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "700",
  },
});

export default HomeScreen;