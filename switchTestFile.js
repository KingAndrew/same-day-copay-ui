
import React, { useState } from "react";

// This is a test function to debug switch/case statements with JSX
function SwitchCaseTest() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [userData, setUserData] = useState(null);

  // Simple function that simulates navigation
  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
  };

  // Simple render function with switch/case
  const renderScreen = () => {
    switch (currentScreen) {
      case "main-menu":
        return (
          <div>
            Main Menu Screen - User: {userData?.name || "Not logged in"}
          </div>
        );
      case "login":
        return (
          <div>
            Login Screen
          </div>
        );
      case "about":
        return (
          <div>
            About Screen
          </div>
        );
      default:
        return (
          <div>
            Home Screen
          </div>
        );
    }
  };

  // Now let's make it gradually more complex (like your App.js)
  const renderComplexScreen = () => {
    switch (currentScreen) {
      case "main-menu":
        return (
          <div
            navigateTo={handleNavigate}
            userData={userData}
          >
            Main Menu Content
          </div>
        );
      case "login":
        return (
          <div
            navigateTo={handleNavigate}
            setUserData={setUserData}
          >
            Login Content
          </div>
        );
      case "new-purchase":
        return (
          <div
            navigateTo={handleNavigate}
            frontReceiptImage={"test.jpg"}
            backReceiptImage={"test2.jpg"}
          >
            New Purchase Content
          </div>
        );
      case "about":
        return <div navigateTo={handleNavigate}>About Content</div>;
      default:
        return <div navigateTo={handleNavigate}>Home Content</div>;
    }
  };

  return (
    <div>
      <h1>Test Component</h1>
      {renderScreen()}
      <hr />
      {renderComplexScreen()}
    </div>
  );
}

export default SwitchCaseTest;
