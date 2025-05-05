import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/index.js.js.js.js.js';
import { ScreenTemplate } from '../components/index.js.js.js.js.js';

const AccountHistoryScreen = ({ navigateTo }) => (
  <ScreenTemplate title="Account History" navigateTo={navigateTo}>
    <View style={styles.container}>
      <Text style={styles.instructionsText}>
        Your account history and transaction records will appear here.
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
  }
});

export default AccountHistoryScreen;