
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants';

const TabSelector = ({ activeTab, setActiveTab }) => {
  // Animation ref to track position
  const [indicatorLeft, setIndicatorLeft] = useState(activeTab === "login" ? "0%" : "50%");

  // Update indicator position with animation effect
  useEffect(() => {
    setIndicatorLeft(activeTab === "login" ? "0%" : "50%");
  }, [activeTab]);

  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => setActiveTab("login")}
      >
        <Text
          style={[
            styles.tabButtonText,
            activeTab === "login" ? styles.activeTabText : styles.inactiveTabText,
          ]}
        >
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => setActiveTab("signup")}
      >
        <Text
          style={[
            styles.tabButtonText,
            activeTab === "signup" ? styles.activeTabText : styles.inactiveTabText,
          ]}
        >
          Sign up
        </Text>
      </TouchableOpacity>

      {/* Sliding indicator */}
      <View 
        style={[
          styles.tabIndicator, 
          { left: indicatorLeft, transition: "all 0.3s ease-in-out" }
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LIGHT_GRAY,
    position: "relative",
    height: 36,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
  },
  tabButtonText: {
    fontSize: 14,
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "500",
  },
  activeTabText: {
    color: Colors.NAVY_BLUE,
  },
  inactiveTabText: {
    color: Colors.MEDIUM_GRAY,
  },
  tabIndicator: {
    position: "absolute",
    bottom: -1,
    width: "50%",
    height: 2,
    backgroundColor: Colors.NAVY_BLUE,
  },
});

export default TabSelector;
