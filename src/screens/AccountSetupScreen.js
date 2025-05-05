import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/index.js.js.js.js.js.js';
import { ScreenTemplate, AppButton, TabSelector, FormInput } from '../components/index.js.js.js.js.js.js';
import { dataAPI } from '../utils/dataAPI.js.js.js.js.js.js'; // Import the dataAPI from utils directory


const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </View>
);

// We'll use the FormInput component directly instead of this custom FormField

const AccountSetupScreen = ({ 
  navigateTo = (screen) => console.warn(`Navigation to "${screen}" attempted but no navigateTo function provided`), 
  userData = { username: "Guest" } 
}) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [insuranceProviders, setInsuranceProviders] = useState([]);
  const email = userData?.username || "David"; // Use logged in user or default to David

  // Form state with separate objects for each section
  const [personalData, setPersonalData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    preferredName: '',
  });

  const [bankData, setBankData] = useState({
    bankName: '',
    routingNumber: '',
    accountNumber: '',
  });

  const [insuranceData, setInsuranceData] = useState({
    provider: '',
    policyNumber: '',
    groupNumber: '',
  });

  const [sameDayData, setSameDayData] = useState({
    paymentMethod: '',
    preferredBank: '',
  });

  // Load data when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Loading data for user:', email);

        // Load insurance providers (global data)
        const providers = await dataAPI.getData('accountSetup.insuranceProviders');
        if (providers) {
          setInsuranceProviders(providers);
        }

        // Load user specific data if available
        const personalInfo = await dataAPI.getUserData(email, 'accountSetup.personal');
        console.log('Loaded personal data:', personalInfo);
        if (personalInfo) {
          setPersonalData(personalInfo);
        }

        const bankInfo = await dataAPI.getUserData(email, 'accountSetup.bank');
        if (bankInfo) {
          setBankData(bankInfo);
        }

        const insuranceInfo = await dataAPI.getUserData(email, 'accountSetup.insurance');
        if (insuranceInfo) {
          setInsuranceData(insuranceInfo);
        }

        const sameDayInfo = await dataAPI.getUserData(email, 'accountSetup.sameDay');
        if (sameDayInfo) {
          setSameDayData(sameDayInfo);
        }
      } catch (error) {
        console.error('Error loading account setup data:', error);
      }
    };

    loadData();
  }, [email]);

  const handlePersonalChange = (field, value) => {
    setPersonalData({
      ...personalData,
      [field]: value,
    });
  };

  const handleBankChange = (field, value) => {
    setBankData({
      ...bankData,
      [field]: value,
    });
  };

  const handleInsuranceChange = (field, value) => {
    setInsuranceData({
      ...insuranceData,
      [field]: value,
    });
  };

  const handleSameDayChange = (field, value) => {
    setSameDayData({
      ...sameDayData,
      [field]: value,
    });
  };

  const handleSave = async () => {
    try {
      // Save all sections of data
      await dataAPI.saveUserData(email, 'accountSetup.personal', personalData);
      await dataAPI.saveUserData(email, 'accountSetup.bank', bankData);
      await dataAPI.saveUserData(email, 'accountSetup.insurance', insuranceData);
      await dataAPI.saveUserData(email, 'accountSetup.sameDay', sameDayData);

      console.log('Account setup data saved successfully');
      // Stay on current screen and show success message
      alert('Account setup data saved successfully!');
    } catch (error) {
      console.error('Error saving account setup data:', error);
      alert('Error saving account setup data. Please try again.');
    }
  };

  // Define tab configuration
  const accountSetupTabs = [
    { id: 'personal', label: 'Personal' },
    { id: 'bank', label: 'Bank' },
    { id: 'insurance', label: 'Insurance' },
    { id: 'sameday', label: 'Same Day' }
  ];

  // Import TabSelector from components instead of using a local implementation


  // Insurance provider selector component
  const InsuranceProviderSelector = () => (
    <View style={styles.formField}>
      <Text style={styles.fieldLabel}>Insurance Provider</Text>
      <View style={styles.selectContainer}>
        <select
          style={styles.select}
          value={insuranceData.provider}
          onChange={(e) => handleInsuranceChange('provider', e.target.value)}
        >
          <option value="">Select your insurance provider</option>
          {insuranceProviders.map((provider, index) => (
            <option key={index} value={provider}>
              {provider}
            </option>
          ))}
        </select>
      </View>
    </View>
  );

  return (
    <ScreenTemplate title="Account Setup" navigateTo={navigateTo}>
      <TabSelector tabs={accountSetupTabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <ScrollView style={styles.scrollView}>
        {activeTab === "personal" && (
          <>
            <SectionHeader title="Personal Information" />
            <FormInput
              label="First Name"
              value={personalData.firstName}
              onChangeText={(value) => handlePersonalChange('firstName', value)}
              placeholder="Your first name"
              inputId="firstName"
              focusedInput={activeTab}
              setFocusedInput={() => {}}
            />
            <FormInput
              label="Last Name"
              value={personalData.lastName}
              onChangeText={(value) => handlePersonalChange('lastName', value)}
              placeholder="Your last name"
              inputId="lastName"
              focusedInput={activeTab}
              setFocusedInput={() => {}}
            />
            <FormInput
              label="Email"
              value={personalData.email}
              onChangeText={(value) => handlePersonalChange('email', value)}
              placeholder="Your email address"
              inputId="email"
              focusedInput={activeTab}
              setFocusedInput={() => {}}
            />
            <FormInput
              label="Preferred Name"
              value={personalData.preferredName}
              onChangeText={(value) => handlePersonalChange('preferredName', value)}
              placeholder="Your preferred name"
              inputId="preferredName"
              focusedInput={activeTab}
              setFocusedInput={() => {}}
            />
          </>
        )}

        {activeTab === "bank" && (
          <>
            <SectionHeader title="Banking Information" />
            <FormInput
              label="Bank Name"
              value={bankData.bankName}
              onChangeText={(value) => handleBankChange('bankName', value)}
              placeholder="Your bank name"
              inputId="bankName"
              focusedInput={activeTab}
              setFocusedInput={() => {}}
            />
            <FormInput
              label="Routing Number"
              value={bankData.routingNumber}
              onChangeText={(value) => handleBankChange('routingNumber', value)}
              placeholder="Your routing number"
              inputId="routingNumber"
              focusedInput={activeTab}
              setFocusedInput={() => {}}
            />
            <FormInput
              label="Account Number"
              value={bankData.accountNumber}
              onChangeText={(value) => handleBankChange('accountNumber', value)}
              placeholder="Your account number"
              inputId="accountNumber"
              focusedInput={activeTab}
              setFocusedInput={() => {}}
            />
          </>
        )}

        {activeTab === "insurance" && (
          <>
            <SectionHeader title="Insurance Information" />
            <InsuranceProviderSelector />
            <FormInput
              label="Policy Number"
              value={insuranceData.policyNumber}
              onChangeText={(value) => handleInsuranceChange('policyNumber', value)}
              placeholder="Your policy number"
              inputId="policyNumber"
              focusedInput={activeTab}
              setFocusedInput={() => {}}
            />
            <FormInput
              label="Group Number"
              value={insuranceData.groupNumber}
              onChangeText={(value) => handleInsuranceChange('groupNumber', value)}
              placeholder="Your group number"
              inputId="groupNumber"
              focusedInput={activeTab}
              setFocusedInput={() => {}}
            />
          </>
        )}

        {activeTab === "sameday" && (
          <>
            <SectionHeader title="Same Day Co-Pay Information" />
            <FormInput
              label="Payment Method"
              value={sameDayData.paymentMethod}
              onChangeText={(value) => handleSameDayChange('paymentMethod', value)}
              placeholder="Your preferred payment method"
              inputId="paymentMethod"
              focusedInput={activeTab}
              setFocusedInput={() => {}}
            />
            <FormInput
              label="Preferred Bank"
              value={sameDayData.preferredBank}
              onChangeText={(value) => handleSameDayChange('preferredBank', value)}
              placeholder="Your preferred bank for same-day payments"
              inputId="preferredBank"
              focusedInput={activeTab}
              setFocusedInput={() => {}}
            />
          </>
        )}

        <View style={styles.buttonContainer}>
          <AppButton text="Save" onPress={handleSave} />
        </View>
      </ScrollView>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: '100%',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LIGHT_GRAY,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.FOREST_GREEN,
  },
  tabText: {
    fontSize: 14,
    color: Colors.DARK_GRAY,
    fontFamily: "Montserrat, sans-serif",
    fontWeight: '600',
  },
  activeTabText: {
    color: Colors.FOREST_GREEN,
    fontWeight: '700',
  },
  sectionHeader: {
    backgroundColor: Colors.NAVY_BLUE,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  sectionHeaderText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: "Montserrat, sans-serif",
  },
  formField: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 14,
    marginBottom: 5,
    color: Colors.NAVY_BLUE,
    fontWeight: '600',
    fontFamily: "Montserrat, sans-serif",
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: Colors.MEDIUM_GRAY,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    fontFamily: "Montserrat, sans-serif",
  },
  selectContainer: {
    height: 40,
    borderWidth: 1,
    borderColor: Colors.MEDIUM_GRAY,
    borderRadius: 5,
    overflow: 'hidden',
  },
  select: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 10,
    fontSize: 14,
    fontFamily: "Montserrat, sans-serif",
    border: 'none',
    outline: 'none',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
  }
});

export default AccountSetupScreen;