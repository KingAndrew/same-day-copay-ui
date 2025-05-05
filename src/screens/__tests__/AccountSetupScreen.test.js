import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AccountSetupScreen from '../AccountSetupScreen.js.js.js.js.js';
import { dataAPI } from '../../utils/dataAPI';

jest.mock('../../utils/dataAPI', () => ({
  dataAPI: {
    getUserData: jest.fn().mockReturnValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '555-123-4567'
    }),
    getAccountInfo: jest.fn().mockReturnValue({
      accountId: 'ACC98765',
      status: 'Active'
    }),
    getInsuranceInfo: jest.fn().mockReturnValue({
      provider: 'Health Insurance Co.',
      policyNumber: 'POL-123456',
      groupNumber: 'GRP-789012'
    }),
    setUserData: jest.fn().mockReturnValue(true),
    setAccountInfo: jest.fn().mockReturnValue(true),
    setInsuranceInfo: jest.fn().mockReturnValue(true)
  }
}));

describe('AccountSetupScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    const { getByText } = render(<AccountSetupScreen />);
    expect(getByText('Account Setup')).toBeTruthy();
  });

  test('tabs switch correctly', () => {
    const { getByText } = render(<AccountSetupScreen />);

    // Should start with Profile tab selected
    expect(getByText('First Name')).toBeTruthy();

    // Switch to Insurance tab
    fireEvent.press(getByText('Insurance'));
    expect(getByText('Insurance Provider')).toBeTruthy();

    // Switch to Account tab
    fireEvent.press(getByText('Account'));
    expect(getByText('Account Status')).toBeTruthy();

    // Switch back to Profile tab
    fireEvent.press(getByText('Profile'));
    expect(getByText('First Name')).toBeTruthy();
  });

  test('loads user data when component mounts', () => {
    render(<AccountSetupScreen />);
    expect(dataAPI.getUserData).toHaveBeenCalled();
    expect(dataAPI.getAccountInfo).toHaveBeenCalled();
    expect(dataAPI.getInsuranceInfo).toHaveBeenCalled();
  });
});