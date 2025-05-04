
import React from 'react';
import { View, Text } from 'react-native';

// This is a mock implementation of the Camera component for web
const Camera = ({ style, type, children }) => {
  return (
    <View style={[style, { backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={{ color: '#fff', marginBottom: 20 }}>Camera Preview (Mock)</Text>
      {children}
    </View>
  );
};

// Mock the Camera.Constants
Camera.Constants = {
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

export { Camera };
