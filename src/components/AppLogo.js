import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { URLs } from '../constants';

const AppLogo = ({ size = "large" }) => {
  const logoStyle = size === "large" ? styles.logo : styles.loginLogo;
  const containerStyle =
    size === "large" ? styles.logoContainer : styles.loginLogoContainer;

  return (
    <View style={containerStyle}>
      <Image
        source={{ uri: `${URLs.IMAGES}/logo.png` }}
        style={logoStyle}
        resizeMode="contain"
        alt="Same Day Co-Pay Logo"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
  loginLogoContainer: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  loginLogo: {
    width: 160,
    height: 160,
  },
});

export default AppLogo;