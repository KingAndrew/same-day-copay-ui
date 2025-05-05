import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Colors, URLs } from '../constants/index.js.js.js';
import AppButton from './AppButton.js.js.js';

// Reusable screen template component that follows the standard layout
const ScreenTemplate = ({ 
  title, 
  children, 
  navigateTo = (screen) => console.warn(`Navigation to "${screen}" attempted but no navigateTo function provided`), 
  showBackButton = true 
}) => (
  <View style={styles.screen}>
    <View style={styles.blueBackground}>
      <View style={styles.whiteContentBox}>
        <View style={styles.screenHeader}>
          <Image
            source={{ uri: `${URLs.IMAGES}/logo.png` }}
            style={styles.screenHeaderLogo}
            resizeMode="contain"
            alt="Same Day Co-Pay Logo"
          />
          <Text style={styles.screenHeaderTitle}>{title}</Text>
        </View>

        <View style={styles.screenContent}>
          {children}
        </View>
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
  blueBackground: {
    padding: 0,
    backgroundColor: Colors.NAVY_BLUE,
    borderRadius: 8,
    width: "100%",
    maxWidth: 500,
    height: "100%",
    maxHeight: 800,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  whiteContentBox: {
    backgroundColor: Colors.WHITE,
    margin: 15,
    marginBottom: 0,
    borderRadius: 8,
    flex: 1,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
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
    width: 100,
    height: 100,
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
    padding: 15,
  },
  backButtonContainer: {
    width: "100%",
    padding: 15,
  },
  secondaryButton: {
    backgroundColor: Colors.FOREST_GREEN,
    borderWidth: 0,
  },
  secondaryButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Montserrat, sans-serif",
  },
});

export default ScreenTemplate;