import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../constants';

const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  inputId,
  focusedInput,
  setFocusedInput,
}) => (
  <View style={styles.formGroup}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, focusedInput === inputId && styles.inputFocused]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={Colors.MEDIUM_GRAY}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize="none"
      onFocus={() => setFocusedInput(inputId)}
      onBlur={() => setFocusedInput(null)}
    />
  </View>
);

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
    color: Colors.NAVY_BLUE,
    fontFamily: "Montserrat, sans-serif",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: Colors.WHITE,
  },
  inputFocused: {
    borderColor: Colors.FOREST_GREEN,
    borderWidth: 2,
  },
});

export default FormInput;