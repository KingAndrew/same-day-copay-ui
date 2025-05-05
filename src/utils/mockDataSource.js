
// Mock data for development and testing
export const mockData = {
  userData: {
    id: "user123",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "555-123-4567"
  },
  
  accountInfo: {
    accountId: "ACC98765",
    createdDate: "2023-05-15",
    status: "Active"
  },
  
  insuranceInfo: {
    provider: "Health Insurance Co.",
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
