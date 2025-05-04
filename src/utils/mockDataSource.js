
/**
 * Mock Data Source File
 * This file contains mock data that simulates API responses
 */

const mockData = {
  // Insurance providers list for everyone
  "accountSetup.insuranceProviders": [
    "Anthem Blue Cross and Blue Shield",
    "Blue Cross and Blue Shield of Alabama",
    "Blue Cross and Blue Shield of Alaska",
    "Blue Cross and Blue Shield of Arizona",
    "Arkansas Blue Cross and Blue Shield",
    "Blue Cross and Blue Shield of California",
    "Anthem Blue Cross and Blue Shield (Colorado)",
    "Blue Cross and Blue Shield of Connecticut",
    "Highmark Blue Cross Blue Shield Delaware",
    "Florida Blue",
    "Blue Cross and Blue Shield of Georgia",
    "Blue Cross Blue Shield Association - Hawaii Medical Service Association",
    "Blue Cross of Idaho",
    "Blue Cross and Blue Shield of Illinois",
    "Anthem Blue Cross and Blue Shield (Indiana)",
    "Wellmark Blue Cross and Blue Shield of Iowa",
    "Blue Cross and Blue Shield of Kansas",
    "Anthem Blue Cross and Blue Shield (Kentucky)",
    "Blue Cross and Blue Shield of Louisiana",
    "Anthem Blue Cross and Blue Shield (Maine)",
    "Blue Cross and Blue Shield of Massachusetts",
    "Blue Cross Blue Shield of Michigan",
    "Blue Cross and Blue Shield of Minnesota",
    "Blue Cross and Blue Shield of Mississippi",
    "Anthem Blue Cross and Blue Shield (Missouri)",
    "Blue Cross and Blue Shield of Montana",
    "Blue Cross and Blue Shield of Nebraska",
    "Anthem Blue Cross and Blue Shield (Nevada)",
    "Anthem Blue Cross and Blue Shield (New Hampshire)",
    "Horizon Blue Cross Blue Shield of New Jersey",
    "Blue Cross and Blue Shield of New Mexico",
    "Blue Cross Blue Shield of North Carolina",
    "Blue Cross Blue Shield of North Dakota"
  ],
  
  // Example of user-specific data (keyed by email)
  "David.accountSetup.personal": {
    firstName: "David",
    lastName: "Smith",
    email: "David",
    preferredName: "David Smith"
  },
  
  "David.accountSetup.bank": {
    bankName: "First National Bank",
    routingNumber: "123456789",
    accountNumber: "987654321"
  },
  
  "David.accountSetup.insurance": {
    provider: "Blue Cross and Blue Shield of Arizona",
    policyNumber: "BC12345678",
    groupNumber: "AZ987654"
  },
  
  "David.accountSetup.sameDay": {
    paymentMethod: "Direct Deposit",
    preferredBank: "First National Bank"
  }
};

// Make sure mockData is mutable so we can update it
const mockData = {
  // Insurance providers list for everyone
  "accountSetup.insuranceProviders": [
    "Anthem Blue Cross and Blue Shield",
    "Blue Cross and Blue Shield of Alabama",
    "Blue Cross and Blue Shield of Alaska",
    "Blue Cross and Blue Shield of Arizona",
    "Arkansas Blue Cross and Blue Shield",
    "Blue Cross and Blue Shield of California",
    "Anthem Blue Cross and Blue Shield (Colorado)",
    "Blue Cross and Blue Shield of Connecticut",
    "Highmark Blue Cross Blue Shield Delaware",
    "Florida Blue",
    "Blue Cross and Blue Shield of Georgia",
    "Blue Cross Blue Shield Association - Hawaii Medical Service Association",
    "Blue Cross of Idaho",
    "Blue Cross and Blue Shield of Illinois",
    "Anthem Blue Cross and Blue Shield (Indiana)",
    "Wellmark Blue Cross and Blue Shield of Iowa",
    "Blue Cross and Blue Shield of Kansas",
    "Anthem Blue Cross and Blue Shield (Kentucky)",
    "Blue Cross and Blue Shield of Louisiana",
    "Anthem Blue Cross and Blue Shield (Maine)",
    "Blue Cross and Blue Shield of Massachusetts",
    "Blue Cross Blue Shield of Michigan",
    "Blue Cross and Blue Shield of Minnesota",
    "Blue Cross and Blue Shield of Mississippi",
    "Anthem Blue Cross and Blue Shield (Missouri)",
    "Blue Cross and Blue Shield of Montana",
    "Blue Cross and Blue Shield of Nebraska",
    "Anthem Blue Cross and Blue Shield (Nevada)",
    "Anthem Blue Cross and Blue Shield (New Hampshire)",
    "Horizon Blue Cross Blue Shield of New Jersey",
    "Blue Cross and Blue Shield of New Mexico",
    "Blue Cross Blue Shield of North Carolina",
    "Blue Cross Blue Shield of North Dakota"
  ],
  
  // Example of user-specific data (keyed by email)
  "David.accountSetup.personal": {
    firstName: "David",
    lastName: "Smith",
    email: "David",
    preferredName: "David Smith"
  },
  
  "David.accountSetup.bank": {
    bankName: "First National Bank",
    routingNumber: "123456789",
    accountNumber: "987654321"
  },
  
  "David.accountSetup.insurance": {
    provider: "Blue Cross and Blue Shield of Arizona",
    policyNumber: "BC12345678",
    groupNumber: "AZ987654"
  },
  
  "David.accountSetup.sameDay": {
    paymentMethod: "Direct Deposit",
    preferredBank: "First National Bank"
  }
};

module.exports = { default: mockData };
