
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from '../constants';
import { ScreenTemplate, AppButton } from '../components';

const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </View>
);

const FormField = ({ label, value, onChangeText, placeholder, secureTextEntry = false }) => (
  <View style={styles.formField}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TextInput
      style={styles.textInput}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

const AccountSetupScreen = ({ navigateTo }) => {
  // Customer Information
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [preferredName, setPreferredName] = useState('');
  
  // Bank Information
  const [bankName, setBankName] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  
  // Selected Insurance Provider
  const [selectedProvider, setSelectedProvider] = useState(null);
  
  // List of insurance providers
  const insuranceProviders = [
    "Aetna", "Anthem", "Blue Cross Blue Shield", "Cigna", "Humana", 
    "Kaiser Permanente", "UnitedHealthcare", "Medicare", "Medicaid",
    "Molina Healthcare", "Centene", "HealthNet", "Carefirst", "Highmark",
    "Wellcare", "Oscar Health", "AmeriHealth", "Harvard Pilgrim",
    "Tufts Health Plan", "Priority Health", "UPMC Health Plan",
    "Independence Blue Cross", "Emblem Health", "Health Alliance",
    "Premera Blue Cross", "Providence Health Plan", "Geisinger",
    "Dean Health Plan", "Community Health Choice", "Neighborhood Health Plan",
    "Security Health Plan", "HealthPartners", "Quartz"
  ];
  
  const handleSave = () => {
    // Save logic would go here
    alert('Account information saved successfully!');
    navigateTo('main-menu');
  };
  
  return (
    <ScreenTemplate title="Account Setup" navigateTo={navigateTo}>
      <ScrollView style={styles.container}>
        <SectionHeader title="Customer Information" />
        <View style={styles.formSection}>
          <FormField 
            label="First Name" 
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter your first name"
          />
          <FormField 
            label="Last Name" 
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter your last name"
          />
          <FormField 
            label="Email" 
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email address"
          />
          <FormField 
            label="Preferred Name" 
            value={preferredName}
            onChangeText={setPreferredName}
            placeholder="Enter your preferred name"
          />
        </View>
        
        <SectionHeader title="Customer Bank Information" />
        <View style={styles.formSection}>
          <FormField 
            label="Bank Name" 
            value={bankName}
            onChangeText={setBankName}
            placeholder="Enter your bank name"
          />
          <FormField 
            label="Routing Number" 
            value={routingNumber}
            onChangeText={setRoutingNumber}
            placeholder="Enter routing number"
          />
          <FormField 
            label="Account Number" 
            value={accountNumber}
            onChangeText={setAccountNumber}
            placeholder="Enter account number"
          />
        </View>
        
        <SectionHeader title="Customer Insurance Provider" />
        <View style={styles.formSection}>
          <Text style={styles.fieldLabel}>Select Insurance Provider</Text>
          <View style={styles.providerGrid}>
            {insuranceProviders.map((provider, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.providerItem,
                  selectedProvider === provider && styles.selectedProvider
                ]}
                onPress={() => setSelectedProvider(provider)}
              >
                <Text 
                  style={[
                    styles.providerText,
                    selectedProvider === provider && styles.selectedProviderText
                  ]}
                >
                  {provider}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <SectionHeader title="Same Day Co-Pay Bank Information" />
        <View style={styles.formSection}>
          <Text style={styles.infoText}>
            Same Day Co-Pay uses Stripe for secure payment processing. Your refunds will be processed through our financial partner.
          </Text>
          <Text style={styles.infoText}>
            Bank: First National Bank
          </Text>
          <Text style={styles.infoText}>
            Refund Processing Time: 1-2 business days
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <AppButton 
            title="Save Information" 
            onPress={handleSave} 
            style={styles.saveButton}
            textStyle={styles.saveButtonText}
          />
        </View>
      </ScrollView>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.WHITE,
  },
  sectionHeader: {
    backgroundColor: Colors.FOREST_GREEN,
    padding: 12,
    borderRadius: 6,
    marginVertical: 10,
  },
  sectionHeaderText: {
    fontSize: 18,
    color: Colors.WHITE,
    fontWeight: "700",
    fontFamily: "Montserrat, sans-serif",
  },
  formSection: {
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 6,
    padding: 15,
    marginBottom: 10,
  },
  formField: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 16,
    color: Colors.NAVY_BLUE,
    marginBottom: 8,
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "500",
  },
  textInput: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.MEDIUM_GRAY,
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    color: Colors.NAVY_BLUE,
    fontFamily: "Montserrat, sans-serif",
  },
  providerGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  providerItem: {
    width: "48%",
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.MEDIUM_GRAY,
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  selectedProvider: {
    backgroundColor: Colors.NAVY_BLUE,
    borderColor: Colors.NAVY_BLUE,
  },
  providerText: {
    fontSize: 14,
    color: Colors.NAVY_BLUE,
    textAlign: "center",
    fontFamily: "Montserrat, sans-serif",
  },
  selectedProviderText: {
    color: Colors.WHITE,
    fontWeight: "700",
  },
  infoText: {
    fontSize: 16,
    color: Colors.NAVY_BLUE,
    marginBottom: 10,
    fontFamily: "Montserrat, sans-serif",
    lineHeight: 24,
  },
  buttonContainer: {
    marginVertical: 20,
  },
  saveButton: {
    backgroundColor: Colors.FOREST_GREEN,
    padding: 15,
  },
  saveButtonText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: "700",
  }
});

export default AccountSetupScreen;
