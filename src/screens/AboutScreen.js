
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants';
import { AppButton } from '../components';

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

const AboutScreen = ({ navigateTo }) => (
  <BasicScreen
    title="About"
    description="About page placeholder"
    navigateTo={navigateTo}
  />
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
});

export default AboutScreen;
