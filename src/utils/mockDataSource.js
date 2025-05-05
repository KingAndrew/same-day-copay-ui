
// Mock data for development and testing
export const mockData = {
  // Empty template for user data

  
  // Global data (not user-specific)
  accountSetup: {
    insuranceProviders: [
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
    ]
  },
  
  insuranceInfo: {
    provider: "Blue Cross and Blue Shield of California",
    policyNumber: "POL-123456",
    groupNumber: "GRP-789012",
    coverageType: "Family",
    copayAmount: 25.00
  },
  
  paymentMethods: [
    {
      id: "pm1",
      type: "creditCard",
      cardType: "Visa",
      lastFour: "4242",
      expiryDate: "05/25",
      isDefault: true
    },
    {
      id: "pm2",
      type: "bankAccount",
      accountType: "Checking",
      lastFour: "9876",
      bankName: "First National Bank",
      isDefault: false
    }
  ],
  
  copayHistory: [
    {
      id: "tx1",
      date: "2023-08-10",
      provider: "Dr. Smith Clinic",
      amount: 25.00,
      status: "Paid",
      paymentMethod: "Visa ending in 4242"
    },
    {
      id: "tx2",
      date: "2023-07-22",
      provider: "City Medical Center",
      amount: 35.00,
      status: "Paid",
      paymentMethod: "Bank Account ending in 9876"
    },
    {
      id: "tx3",
      date: "2023-06-15",
      provider: "Wellness Pharmacy",
      amount: 10.00,
      status: "Paid",
      paymentMethod: "Visa ending in 4242"
    }
  ]
};
