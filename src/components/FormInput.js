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
  onBlur,
  rightIcon
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
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            isFocused && styles.focusedInput,
            error && styles.inputError,
            rightIcon && styles.inputWithIcon
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {rightIcon && (
          <View style={styles.rightIconContainer}>
            {rightIcon}
          </View>
        )}
      </View>
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
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    fontFamily: 'Montserrat, sans-serif',
    flex: 1,
  },
  inputWithIcon: {
    paddingRight: 40, // Make room for the icon
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
  },
  rightIconContainer: {
    position: 'absolute',
    right: 5,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default FormInput;