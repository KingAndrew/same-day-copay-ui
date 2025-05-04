
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Mock Camera implementation for web
export class Camera extends React.Component {
  static Constants = {
    Type: {
      front: 'front',
      back: 'back',
    },
    FlashMode: {
      on: 'on',
      off: 'off',
      auto: 'auto',
      torch: 'torch',
    },
  };

  static requestCameraPermissionsAsync = async () => {
    return { status: 'granted' };
  };

  takePictureAsync = async (options = {}) => {
    console.log('Mock camera: taking picture');
    // Return a mock image URI
    return { uri: 'https://example.com/mock-image.jpg' };
  };

  render() {
    return (
      <View style={[styles.camera, this.props.style]}>
        <Text style={styles.text}>Camera Preview</Text>
        <Text style={styles.subtext}>(Mock camera for web)</Text>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  camera: {
    backgroundColor: '#222',
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtext: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 8,
  },
});
