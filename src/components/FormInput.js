import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../constants/index.js';

const FormInput = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry = false, 
  keyboardType = 'default',
  inputId,
  focusedInput,
  setFocusedInput,
  error,
  onFocus,
  onBlur
}) => {
  // Determine if this input is currently focused
  const isFocused = focusedInput === inputId;

  const handleFocus = () => {
    setFocusedInput(inputId);
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    setFocusedInput(null);
    if (onBlur) onBlur();
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          isFocused && styles.focusedInput,
          error && styles.inputError
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.NAVY_BLUE,
    fontFamily: 'Montserrat, sans-serif',
  },
  input: {
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    fontFamily: 'Montserrat, sans-serif',
  },
  focusedInput: {
    borderColor: Colors.NAVY_BLUE,
    borderWidth: 2,
  },
  inputError: {
    borderColor: '#ff3b30',
    borderWidth: 1,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'Montserrat, sans-serif',
  }
});

export default FormInput;