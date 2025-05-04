import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Colors, URLs } from '../constants';
import AppButton from './AppButton';

// Reusable screen template component that follows the standard layout
const ScreenTemplate = ({ title, children, navigateTo, showBackButton = true }) => (
  <View style={styles.screen}>
    <View style={styles.boxFull}>
      <View style={styles.screenHeader}>
        <Image
          source={{ uri: `${URLs.IMAGES}/logo.png` }}
          style={styles.screenHeaderLogo}
          alt="Same Day Co-Pay Logo"
        />
        <Text style={styles.screenHeaderTitle}>{title}</Text>
      </View>

      <View style={styles.screenContent}>
        {children}
      </View>

      {showBackButton && (
        <View style={styles.backButtonContainer}>
          <AppButton
            text="Back"
            onPress={() => navigateTo("main-menu")}
            style={styles.secondaryButton}
            textStyle={styles.secondaryButtonText}
          />
        </View>
      )}
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
  screenHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: Colors.WHITE,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LIGHT_GRAY,
  },
  screenHeaderLogo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  screenHeaderTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.NAVY_BLUE,
    textAlign: "center",
    flex: 1,
    marginRight: 50, // To offset the logo and center the title
    fontFamily: "Montserrat, sans-serif",
  },
  screenContent: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.NAVY_BLUE,
    padding: 15,
  },
  backButtonContainer: {
    width: "100%",
    padding: 15,
    backgroundColor: Colors.NAVY_BLUE,
  },
  secondaryButton: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
  },
  secondaryButtonText: {
    color: Colors.DARK_GRAY,
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Montserrat, sans-serif",
  },
});

export default ScreenTemplate;