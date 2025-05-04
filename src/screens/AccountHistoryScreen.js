
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors, URLs } from '../constants';
import { AppButton } from '../components';

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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
    color: Colors.NAVY_BLUE,
    textAlign: "center",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "700",
  },
  historyImage: {
    width: "100%",
    height: 500,
    resizeMode: "contain",
    marginVertical: 20,
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

export default AccountHistoryScreen;
