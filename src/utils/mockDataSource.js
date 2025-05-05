
// Mock data for development and testing
export const mockData = {
  'test.key': { value: 'test-value' },
  'insurance.providers': [
    'Anthem Blue Cross and Blue Shield',
    'Blue Cross and Blue Shield of Alabama',
    'Blue Cross and Blue Shield of Florida',
    'Blue Cross and Blue Shield of Illinois',
    'Cigna',
    'Humana',
    'Kaiser Permanente',
    'UnitedHealthcare',
    'Aetna',
    'Centene',
    'Molina Healthcare',
    'CVS Health'
  ],
  'user.preferences': {
    theme: 'light',
    notifications: true,
    autoLogin: false
  },
  'user.profile': {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '555-123-4567',
    insuranceProvider: 'Blue Cross and Blue Shield of Illinois',
    memberID: 'BCBS1234567',
    groupID: 'GRP987654321'
  },
  'user.history': [
    {
      id: 'txn001',
      date: '2023-05-15',
      type: 'Prescription',
      amount: 25.50,
      status: 'Approved',
      reimbursement: 20.40
    },
    {
      id: 'txn002',
      date: '2023-06-02',
      type: 'Office Visit',
      amount: 125.00,
      status: 'Pending',
      reimbursement: null
    },
    {
      id: 'txn003',
      date: '2023-07-10',
      type: 'Prescription',
      amount: 35.75,
      status: 'Approved',
      reimbursement: 28.60
    }
  ]
};

export default mockData;
