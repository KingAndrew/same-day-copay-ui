
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import AccountSetupScreen from '../AccountSetupScreen.js';

// Mock the dataAPI module
jest.mock('../../utils/dataAPI', () => ({
  dataAPI: {
    getData: jest.fn().mockImplementation((key) => {
      if (key === 'insurance.providers') {
        return Promise.resolve([
          'Anthem Blue Cross and Blue Shield',
          'Blue Cross and Blue Shield of Alabama',
          'Cigna',
          'UnitedHealthcare',
          'Aetna'
        ]);
      } else if (key === 'user.profile') {
        return Promise.resolve({
          name: 'John Doe',
          email: 'john@example.com',
          phone: '555-123-4567',
          insuranceProvider: 'Aetna',
          memberID: 'AETNA123456',
          groupID: 'GRP987654'
        });
      }
      return Promise.resolve(null);
    }),
    saveData: jest.fn().mockResolvedValue(true)
  }
}));

describe('AccountSetupScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    const navigateTo = jest.fn();
    const { getByText } = render(<AccountSetupScreen navigateTo={navigateTo} />);
    expect(getByText('Account Setup')).toBeTruthy();
  });

  test('loads insurance providers on mount', async () => {
    const navigateTo = jest.fn();
    const { getByText } = render(<AccountSetupScreen navigateTo={navigateTo} />);
    
    await waitFor(() => {
      expect(getByText('Select Insurance Provider')).toBeTruthy();
    });
  });

  test('loads user profile data on mount if available', async () => {
    const navigateTo = jest.fn();
    const { getByTestId } = render(<AccountSetupScreen navigateTo={navigateTo} />);
    
    await waitFor(() => {
      expect(getByTestId('name-input').props.value).toBe('John Doe');
      expect(getByTestId('email-input').props.value).toBe('john@example.com');
      expect(getByTestId('phone-input').props.value).toBe('555-123-4567');
      expect(getByTestId('member-id-input').props.value).toBe('AETNA123456');
      expect(getByTestId('group-id-input').props.value).toBe('GRP987654');
    });
  });

  test('saves profile when save button is pressed', async () => {
    const navigateTo = jest.fn();
    const { getByText, getByTestId } = render(<AccountSetupScreen navigateTo={navigateTo} />);
    
    await waitFor(() => {
      expect(getByTestId('name-input')).toBeTruthy();
    });

    // Update input fields
    fireEvent.changeText(getByTestId('name-input'), 'Jane Smith');
    fireEvent.changeText(getByTestId('email-input'), 'jane@example.com');
    
    // Press save button
    fireEvent.press(getByText('Save Profile'));
    
    await waitFor(() => {
      expect(navigateTo).toHaveBeenCalledWith('mainMenu');
    });
  });

  test('displays error message if save fails', async () => {
    const { dataAPI } = require('../../utils/dataAPI');
    dataAPI.saveData.mockRejectedValueOnce(new Error('Save failed'));
    
    const navigateTo = jest.fn();
    const { getByText, queryByText, getByTestId } = render(<AccountSetupScreen navigateTo={navigateTo} />);
    
    await waitFor(() => {
      expect(getByTestId('name-input')).toBeTruthy();
    });

    // Press save button
    fireEvent.press(getByText('Save Profile'));
    
    await waitFor(() => {
      expect(queryByText('Error saving profile')).toBeTruthy();
      expect(navigateTo).not.toHaveBeenCalled();
    });
  });
});
