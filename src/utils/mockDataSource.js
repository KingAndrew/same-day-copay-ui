
/**
 * Mock Data Source
 * 
 * This module provides mock data for development and testing.
 * In a production environment, this would be replaced with actual API calls.
 */

// Mock data store - simulating a database
const mockData = {
  // Demo user account data
  David: {
    accountSetup: {
      personal: {
        firstName: "David",
        lastName: "Smith",
        preferredName: "Dave",
        email: "david.smith@example.com",
        phoneNumber: "555-123-4567"
      },
      insurance: {
        provider: "Anthem Blue Cross and Blue Shield",
        memberId: "ANT123456789",
        groupNumber: "GRPX987654",
        planType: "PPO",
        deductible: 1500,
        copay: 30
      },
      payment: {
        cardType: "Visa",
        lastFourDigits: "4242",
        expiryDate: "04/25",
        billingZip: "90210"
      }
    },
    purchases: [
      {
        id: "P001",
        date: "2023-09-15",
        provider: "City Pharmacy",
        medication: "Amoxicillin",
        totalCost: 45.99,
        insurancePaid: 35.99,
        outOfPocket: 10.00,
        receiptImage: "receipt_p001.jpg"
      },
      {
        id: "P002",
        date: "2023-10-02",
        provider: "MedPlus",
        medication: "Lisinopril",
        totalCost: 55.50,
        insurancePaid: 40.50,
        outOfPocket: 15.00,
        receiptImage: "receipt_p002.jpg"
      }
    ]
  },
  
  // System data
  system: {
    insuranceProviders: [
      "Aetna",
      "Anthem Blue Cross and Blue Shield",
      "Blue Cross and Blue Shield of Alabama",
      "Cigna",
      "Humana",
      "Kaiser Permanente",
      "Medicare",
      "Medicaid",
      "UnitedHealthcare"
    ],
    commonMedications: [
      "Atorvastatin (Lipitor)",
      "Levothyroxine (Synthroid)",
      "Lisinopril (Prinivil, Zestril)",
      "Metformin (Glucophage)",
      "Amlodipine (Norvasc)",
      "Metoprolol (Lopressor, Toprol XL)",
      "Omeprazole (Prilosec)",
      "Simvastatin (Zocor)",
      "Losartan (Cozaar)",
      "Albuterol (Ventolin, Proventil)"
    ]
  },
  
  // Add the test.key for compatibility with existing tests
  "test.key": { value: "test-value" }
};

// Make sure mockData is mutable and export it as the default export
export default mockData;
