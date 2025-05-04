
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors } from '../constants';
import { AppButton } from '../components';
// Import only the mock camera for web
import { Camera } from '../components/CameraMock';

const SnapReceiptScreen = ({ navigateTo, setFrontReceiptImage, setBackReceiptImage, isFrontSide }) => {
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
    <View style={styles.screen}>
      <View style={styles.boxFull}>
        <Text style={styles.title}>
          {isFrontSide ? 'Front' : 'Back'} Receipt Capture
        </Text>
        <View style={styles.cameraPreviewContainer}>
          {photoTaken ? (
            <View style={styles.confirmationContainer}>
              <Image source={{ uri: capturedImage }} style={styles.cameraPreview} />
              <View style={styles.confirmationButtonsRow}>
                <AppButton text="Retake" onPress={() => {setPhotoTaken(false); setCapturedImage(null);}} style={styles.secondaryButton} textStyle={styles.secondaryButtonText} />
                <AppButton text="Confirm" onPress={handleConfirmPhoto} />
              </View>
            </View>
          ) : (
            <Camera style={styles.cameraPreview} type={type} ref={cameraRef}>
              <View style={styles.cameraControlsContainer}>
                <AppButton text="Take Photo" onPress={takePicture} />
                <AppButton text="Cancel" onPress={() => navigateTo("new-purchase")} style={styles.secondaryButton} textStyle={styles.secondaryButtonText} />
              </View>
            </Camera>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  boxFull: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    width: "100%",
    maxWidth: 500,
    height: "100%",
    maxHeight: 800,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
    color: Colors.NAVY_BLUE,
    textAlign: "center",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "700",
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
    resizeMode: "cover",
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
