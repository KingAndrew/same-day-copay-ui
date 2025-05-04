
import React from "react";
import {
  HomeScreen,
  LoginScreen,
  MainMenuScreen,
  NewPurchaseScreen,
  AccountSetupScreen,
  AccountHistoryScreen,
  AboutScreen,
  SnapReceiptScreen,
} from "../screens";

const renderScreen = (
  currentScreen, 
  handleNavigate, 
  userData, 
  frontReceiptImage, 
  backReceiptImage, 
  setFrontReceiptImage, 
  setBackReceiptImage
) => {
  if (currentScreen === "main-menu") {
    return (
      <MainMenuScreen 
        navigateTo={handleNavigate} 
        userData={userData.userData}
      />
    );
  } else if (currentScreen === "login") {
    return (
      <LoginScreen
        navigateTo={handleNavigate}
        setUserData={userData.setUserData}
      />
    );
  } else if (currentScreen === "new-purchase") {
    return (
      <NewPurchaseScreen
        navigateTo={handleNavigate}
        frontReceiptImage={frontReceiptImage}
        backReceiptImage={backReceiptImage}
      />
    );
  } else if (currentScreen === "account-setup") {
    return (
      <AccountSetupScreen 
        navigateTo={handleNavigate} 
        userData={userData.userData}
      />
    );
  } else if (currentScreen === "account-history") {
    return (
      <AccountHistoryScreen 
        navigateTo={handleNavigate} 
      />
    );
  } else if (currentScreen === "about") {
    return (
      <AboutScreen 
        navigateTo={handleNavigate} 
      />
    );
  } else if (currentScreen === "snap-receipt") {
    return (
      <SnapReceiptScreen
        navigateTo={handleNavigate}
        isFrontSide={!frontReceiptImage}
        setFrontReceiptImage={setFrontReceiptImage}
        setBackReceiptImage={setBackReceiptImage}
      />
    );
  } else {
    return (
      <HomeScreen 
        navigateTo={handleNavigate} 
      />
    );
  }
};

export default renderScreen;
