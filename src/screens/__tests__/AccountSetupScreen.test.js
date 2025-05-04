
import React from 'react';
import { render } from '@testing-library/react-native';
import AccountSetupScreen from '../AccountSetupScreen';

// Mock the dataAPI module
jest.mock('../../utils/dataAPI', () => ({
  dataAPI: {
    getData: jest.fn().mockReturnValue([
      'Anthem Blue Cross and Blue Shield',
      'Blue Cross and Blue Shield of Alabama'
    ])
  }
}));

describe('AccountSetupScreen', () => {
  test('imports dataAPI correctly', () => {
    const { dataAPI } = require('../../utils/dataAPI');
    expect(dataAPI).toBeDefined();
  });
  
  test('renders without crashing', () => {
    // This test will fail if imports are incorrect
    const navigateTo = jest.fn();
    const { getByText } = render(<AccountSetupScreen navigateTo={navigateTo} />);
    expect(getByText('Account Setup')).toBeDefined();
  });
});
