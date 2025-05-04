import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants';

const AppButton = ({ onPress, text, style, textStyle, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.buttonText,
          textStyle,
          disabled && styles.disabledButtonText,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.FOREST_GREEN,
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Montserrat, sans-serif",
  },
  disabledButton: {
    backgroundColor: Colors.FOREST_GREEN,
    opacity: 0.5,
  },
  disabledButtonText: {
    opacity: 0.8,
  },
});

export default AppButton;