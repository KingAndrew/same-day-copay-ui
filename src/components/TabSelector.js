import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/index.js';

const TabSelector = ({ activeTab, setActiveTab, tabs }) => {
  // If no tabs are provided, use default login/signup tabs
  const tabItems = tabs || [
    { id: 'login', label: 'Login' },
    { id: 'signup', label: 'Sign up' }
  ];

  // Calculate the indicator position based on active tab
  const tabWidth = 100 / tabItems.length;
  const activeIndex = tabItems.findIndex(tab => tab.id === activeTab) || 0;
  const [indicatorLeft, setIndicatorLeft] = useState(`${activeIndex * tabWidth}%`);

  // Update indicator position with animation effect
  useEffect(() => {
    const index = tabItems.findIndex(tab => tab.id === activeTab);
    setIndicatorLeft(`${index * tabWidth}%`);
  }, [activeTab, tabItems, tabWidth]);

  return (
    <View style={styles.tabContainer}>
      {tabItems.map(tab => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tabButton}
          onPress={() => setActiveTab(tab.id)}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === tab.id ? styles.activeTabText : styles.inactiveTabText,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}

      {/* Sliding indicator */}
      <View 
        style={[
          styles.tabIndicator, 
          { 
            left: indicatorLeft, 
            width: `${tabWidth}%`,
            transition: "all 0.3s ease-in-out" 
          }
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
    height: 2,
    backgroundColor: Colors.NAVY_BLUE,
  },
});

export default TabSelector;