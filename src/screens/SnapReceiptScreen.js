import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors } from '../constants/index.js.js.js';
import { AppButton, ScreenTemplate } from '../components/index.js.js.js';
// Import only the mock camera for web
import { Camera } from '../components/CameraMock.js.js.js';

const SnapReceiptScreen = ({ 
  navigateTo = (screen) => console.warn(`Navigation to "${screen}" attempted but no navigateTo function provided`), 
  isFrontSide = true, 
  setFrontReceiptImage = (img) => console.warn("setFrontReceiptImage attempted but no function provided", img), 
  setBackReceiptImage = (img) => console.warn("setBackReceiptImage attempted but no function provided", img) 
}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      console.log('Requesting camera access...');
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        let photo = await cameraRef.current.takePictureAsync();
        setCapturedImage(photo.uri);
        setPhotoTaken(true);
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  const handleConfirmPhoto = () => {
    if (isFrontSide) {
      setFrontReceiptImage(capturedImage);
    } else {
      setBackReceiptImage(capturedImage);
    }
    navigateTo("new-purchase");
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ScreenTemplate 
      title={`${isFrontSide ? 'Front' : 'Back'} Receipt Capture`}
      navigateTo={navigateTo}
    >
      <View style={styles.container}>
        <View style={styles.cameraPreviewContainer}>
          {photoTaken ? (
            <View style={styles.confirmationContainer}>
              <Image source={{ uri: capturedImage }} style={styles.cameraPreview} resizeMode="cover" />
              <View style={styles.confirmationButtonsRow}>
                <AppButton 
                  text="Retake" 
                  onPress={() => {setPhotoTaken(false); setCapturedImage(null);}} 
                  style={styles.secondaryButton} 
                  textStyle={styles.secondaryButtonText} 
                />
                <AppButton text="Confirm" onPress={handleConfirmPhoto} />
              </View>
            </View>
          ) : (
            <Camera style={styles.cameraPreview} type={type} ref={cameraRef}>
              <View style={styles.cameraControlsContainer}>
                <AppButton text="Take Photo" onPress={takePicture} />
                <AppButton 
                  text="Cancel" 
                  onPress={() => navigateTo("new-purchase")} 
                  style={styles.secondaryButton} 
                  textStyle={styles.secondaryButtonText} 
                />
              </View>
            </Camera>
          )}
        </View>
      </View>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  cameraPreviewContainer: {
    width: "100%",
    height: 400,
    marginVertical: 20,
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 8,
    overflow: "hidden",
  },
  cameraPreview: {
    width: "100%",
    height: "100%",
  },
  cameraControlsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
  confirmationContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  confirmationButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  secondaryButton: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
  },
  secondaryButtonText: {
    color: Colors.DARK_GRAY,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "700",
  },
});

export default SnapReceiptScreen;