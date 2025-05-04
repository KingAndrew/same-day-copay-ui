
import React, { forwardRef } from 'react';
import { View, Text } from 'react-native';

// This is a mock implementation of the Camera component for web
const Camera = forwardRef(({ style, type, children, onCameraReady, onMountError }, ref) => {
  // Call onCameraReady when component mounts
  React.useEffect(() => {
    if (onCameraReady) {
      setTimeout(() => {
        onCameraReady();
      }, 500);
    }
  }, [onCameraReady]);
  
  return (
    <View 
      ref={ref}
      style={[style, { backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }]}
    >
      <Text style={{ color: '#fff', marginBottom: 20 }}>Camera Preview (Mock)</Text>
      {children}
    </View>
  );
});

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

// Mock camera permission request
Camera.requestCameraPermissionsAsync = async () => {
  console.log('Mock camera permissions requested');
  return { status: 'granted' };
};

// Mock takePictureAsync method
Camera.prototype.takePictureAsync = async (options) => {
  console.log('Mock picture taken', options);
  return { uri: 'https://via.placeholder.com/300x200.png?text=Mock+Camera+Image' };
};

export { Camera };
