
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, URLs } from '../constants';
import { AppButton } from '../components';

const NewPurchaseScreen = ({ navigateTo, frontReceiptImage, backReceiptImage }) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Pass receipt state to other screens and retrieve on return
  useEffect(() => {
    // When front and back images are captured, we can progress to step 3
    if (frontReceiptImage && backReceiptImage) {
      setCurrentStep(3);
    } else if (frontReceiptImage) {
      setCurrentStep(2);
    }
  }, [frontReceiptImage, backReceiptImage]);

  const handleContinue = () => {
    if (currentStep === 3) {
      // Submit the form
      navigateTo("main-menu");
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.box}>
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: `${URLs.IMAGES}/logo.png` }}
            style={styles.newPurchaseLogo}
            alt="Same Day Co-Pay Logo"
          />
          <Text style={styles.title}>New Purchase</Text>
        </View>

        {/* Steps as Blue Menu Items */}
        <View style={styles.stepsMenuContainer}>
          {/* Step 1 */}
          <TouchableOpacity 
            style={[styles.stepMenuItem, currentStep === 1 && styles.activeStepMenu]} 
            onPress={() => navigateTo("snap-receipt")}
          >
            <View style={styles.stepMenuContent}>
              <View style={[styles.stepCircle, currentStep >= 1 && styles.activeStep]}>
                <Text style={styles.stepNumber}>1</Text>
              </View>
              <Text style={styles.stepMenuText}>Front Receipt Capture</Text>
              <Text style={styles.stepChevron}>›</Text>
            </View>

            {frontReceiptImage && (
              <View style={styles.receiptThumbnailsContainer}>
                <Image 
                  source={{ uri: frontReceiptImage }} 
                  style={styles.receiptThumbnail}
                  resizeMode="cover" 
                  alt="Front receipt"
                />
              </View>
            )}
          </TouchableOpacity>

          {/* Step 2 */}
          <TouchableOpacity 
            style={[styles.stepMenuItem, currentStep === 2 && styles.activeStepMenu]} 
            onPress={() => frontReceiptImage && navigateTo("snap-receipt")}
            disabled={!frontReceiptImage}
          >
            <View style={styles.stepMenuContent}>
              <View style={[styles.stepCircle, currentStep >= 2 && styles.activeStep]}>
                <Text style={styles.stepNumber}>2</Text>
              </View>
              <Text style={styles.stepMenuText}>Back Receipt Capture</Text>
              <Text style={styles.stepChevron}>›</Text>
            </View>

            {backReceiptImage && (
              <View style={styles.receiptThumbnailsContainer}>
                <Image 
                  source={{ uri: backReceiptImage }} 
                  style={styles.receiptThumbnail}
                  resizeMode="cover" 
                  alt="Back receipt"
                />
              </View>
            )}
          </TouchableOpacity>

          {/* Step 3 */}
          <TouchableOpacity 
            style={[styles.stepMenuItem, currentStep === 3 && styles.activeStepMenu]} 
            onPress={() => frontReceiptImage && backReceiptImage && setCurrentStep(3)}
            disabled={!frontReceiptImage || !backReceiptImage}
          >
            <View style={styles.stepMenuContent}>
              <View style={[styles.stepCircle, currentStep >= 3 && styles.activeStep]}>
                <Text style={styles.stepNumber}>3</Text>
              </View>
              <Text style={styles.stepMenuText}>Request Refund</Text>
              <Text style={styles.stepChevron}>›</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Step Content Area */}
        <View style={styles.stepContentArea}>
          {currentStep === 1 && (
            <View style={styles.snapReceiptContainer}>
              {(!frontReceiptImage || !backReceiptImage) && (
                <AppButton 
                  text={!frontReceiptImage ? "Snap Front of Receipt" : "Snap Back of Receipt"} 
                  onPress={() => navigateTo("snap-receipt")} 
                />
              )}

              {frontReceiptImage && backReceiptImage && (
                <Text style={styles.receiptCapturedText}>
                  Receipt captured successfully! Proceed to verify details.
                </Text>
              )}
            </View>
          )}

          {currentStep === 2 && (
            <View>
              <Text style={styles.detailsText}>
                Please verify the receipt details are correct
              </Text>
              {/* Here would go the form fields for receipt details */}
            </View>
          )}

          {currentStep === 3 && (
            <View>
              <Text style={styles.detailsText}>
                Submit your refund request
              </Text>
              {/* Here would go final confirmation details */}
            </View>
          )}
        </View>

        <View style={styles.buttonsRow}>
          <AppButton
            text="Cancel" 
            onPress={() => navigateTo("main-menu")} 
            style={styles.cancelButton}
            textStyle={styles.cancelButtonText}
          />

          <AppButton 
            text={currentStep === 3 ? "Submit" : "Continue"} 
            onPress={currentStep === 3 ? () => navigateTo("main-menu") : handleContinue} 
            disabled={currentStep === 1 && (!frontReceiptImage || !backReceiptImage)}
          />
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
  box: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    width: "100%",
    maxWidth: 500,
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  newPurchaseLogo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginRight: 15,
  },
  stepsMenuContainer: {
    width: "100%",
    marginBottom: 20,
  },
  stepMenuItem: {
    flexDirection: "column",
    backgroundColor: Colors.NAVY_BLUE,
    padding: 16,
    borderRadius: 6,
    marginBottom: 12,
    width: "100%",
  },
  activeStepMenu: {
    backgroundColor: Colors.NAVY_BLUE,
  },
  stepMenuContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.LIGHT_GRAY,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  activeStep: {
    backgroundColor: Colors.FOREST_GREEN,
  },
  stepNumber: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Montserrat, sans-serif",
  },
  stepMenuText: {
    fontSize: 16,
    color: Colors.WHITE,
    fontWeight: "500",
    flex: 1,
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "700",
  },
  stepChevron: {
    color: Colors.WHITE,
    fontSize: 24,
    fontWeight: "bold",
  },
  receiptThumbnailsContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-start",
  },
  receiptThumbnail: {
    width: 60,
    height: 80,
    borderRadius: 4,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.WHITE,
  },
  stepContentArea: {
    padding: 15,
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 6,
    minHeight: 150,
    marginBottom: 20,
  },
  snapReceiptContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  receiptCapturedText: {
    fontSize: 16,
    color: Colors.FOREST_GREEN,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "Montserrat, sans-serif",
  },
  detailsText: {
    fontSize: 16,
    color: Colors.NAVY_BLUE,
    fontWeight: "600",
    fontFamily: "Montserrat, sans-serif",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    width: "100%",
  },
  cancelButton: {
    backgroundColor: Colors.CORAL_RED,
    flex: 1,
    marginRight: 10,
  },
  cancelButtonText: {
    color: Colors.WHITE,
  },
});

export default NewPurchaseScreen;
