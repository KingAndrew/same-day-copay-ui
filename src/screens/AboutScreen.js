import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/index.js';
import { ScreenTemplate } from '../components/index.js';

const AboutScreen = ({ navigateTo }) => (
  <ScreenTemplate title="About" navigateTo={navigateTo}>
    <View style={styles.container}>
      <Text style={styles.instructionsText}>
        Same Day Co-Pay helps you get reimbursed for your medical expenses quickly and easily.
      </Text>
      <Text style={styles.instructionsText}>
        Version 1.0.0
      </Text>
      <Text style={styles.instructionsText}>
        © 2023 Same Day Co-Pay Inc.
      </Text>
    </View>
  </ScreenTemplate>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.WHITE,
  },
  instructionsText: {
    fontSize: 16,
    color: Colors.NAVY_BLUE,
    lineHeight: 24,
    marginBottom: 20,
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "500",
    textAlign: "center",
  }
});

export default AboutScreen;