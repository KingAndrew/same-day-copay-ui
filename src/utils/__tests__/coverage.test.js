import { dataAPI } from '../dataAPI.js';
import mockData from '../mockDataSource.js';

// Mock the console methods to avoid cluttering test output
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
};

describe('DataAPI Comprehensive Tests', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset any test keys we might manipulate
    mockData['test.key'] = { value: 'test-value' };
    if ('test.temp' in mockData) delete mockData['test.temp'];
    if ('test.nested' in mockData) delete mockData['test.nested'];
    if ('user.preferences' in mockData) delete mockData['user.preferences'];
  });

  describe('getData', () => {
    test('should retrieve data by direct key', async () => {
      const result = await dataAPI.getData('test.key');
      expect(result).toEqual({ value: 'test-value' });
    });

    test('should return null for non-existent key', async () => {
      const result = await dataAPI.getData('nonexistent.key');
      expect(result).toBeNull();
    });

    test('should handle errors gracefully', async () => {
      // Mock implementation to throw an error
      const originalGetData = dataAPI.getData;
      dataAPI.getData = jest.fn().mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      const result = await dataAPI.getData('test.key');
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalled();

      // Restore original implementation
      dataAPI.getData = originalGetData;
    });
  });

  describe('getUserData', () => {
    test('should retrieve user-specific data', async () => {
      // Setup test data
      await dataAPI.saveData('testUser.preferences', { theme: 'dark' });

      const result = await dataAPI.getUserData('testUser', 'preferences');
      expect(result).toEqual({ theme: 'dark' });
    });

    test('should return null for non-existent user data', async () => {
      const result = await dataAPI.getUserData('nonexistentUser', 'preferences');
      expect(result).toBeNull();
    });

    test('should handle errors gracefully', async () => {
      // Mock implementation to throw an error
      const originalGetUserData = dataAPI.getUserData;
      dataAPI.getUserData = jest.fn().mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      const result = await dataAPI.getUserData('testUser', 'preferences');
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalled();

      // Restore original implementation
      dataAPI.getUserData = originalGetUserData;
    });
  });

  describe('saveData', () => {
    test('should save data by key', async () => {
      const result = await dataAPI.saveData('test.temp', { value: 'temp-value' });
      expect(result).toBe(true);
      expect(mockData['test.temp']).toEqual({ value: 'temp-value' });
    });

    test('should overwrite existing data', async () => {
      // First save
      await dataAPI.saveData('test.temp', { value: 'original' });

      // Then overwrite
      const result = await dataAPI.saveData('test.temp', { value: 'updated' });
      expect(result).toBe(true);
      expect(mockData['test.temp']).toEqual({ value: 'updated' });
    });

    test('should handle errors gracefully', async () => {
      // Mock implementation to throw an error
      const originalSaveData = dataAPI.saveData;
      dataAPI.saveData = jest.fn().mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      const result = await dataAPI.saveData('test.temp', { value: 'temp-value' });
      expect(result).toBe(false);
      expect(console.error).toHaveBeenCalled();

      // Restore original implementation
      dataAPI.saveData = originalSaveData;
    });
  });

  describe('saveUserData', () => {
    test('should save user-specific data', async () => {
      const result = await dataAPI.saveUserData('testUser', 'settings', { language: 'en' });
      expect(result).toBe(true);
      expect(mockData['testUser.settings']).toEqual({ language: 'en' });
    });

    test('should handle errors gracefully', async () => {
      // Mock implementation to throw an error
      const originalSaveUserData = dataAPI.saveUserData;
      dataAPI.saveUserData = jest.fn().mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      const result = await dataAPI.saveUserData('testUser', 'settings', { language: 'en' });
      expect(result).toBe(false);
      expect(console.error).toHaveBeenCalled();

      // Restore original implementation
      dataAPI.saveUserData = originalSaveUserData;
    });
  });

  describe('deleteData', () => {
    test('should delete data by key', async () => {
      // Setup test data
      await dataAPI.saveData('test.temp', { value: 'temp-value' });

      const result = await dataAPI.deleteData('test.temp');
      expect(result).toBe(true);
      expect('test.temp' in mockData).toBe(false);
    });

    test('should return false for non-existent key', async () => {
      const result = await dataAPI.deleteData('nonexistent.key');
      expect(result).toBe(false);
    });

    test('should handle errors gracefully', async () => {
      // Mock implementation to throw an error
      const originalDeleteData = dataAPI.deleteData;
      dataAPI.deleteData = jest.fn().mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      const result = await dataAPI.deleteData('test.key');
      expect(result).toBe(false);
      expect(console.error).toHaveBeenCalled();

      // Restore original implementation
      dataAPI.deleteData = originalDeleteData;
    });
  });

  describe('deleteUserData', () => {
    test('should delete user-specific data', async () => {
      // Setup test data
      await dataAPI.saveUserData('testUser', 'settings', { language: 'en' });

      const result = await dataAPI.deleteUserData('testUser', 'settings');
      expect(result).toBe(true);
      expect('testUser.settings' in mockData).toBe(false);
    });

    test('should handle errors gracefully', async () => {
      // Mock implementation to throw an error
      const originalDeleteUserData = dataAPI.deleteUserData;
      dataAPI.deleteUserData = jest.fn().mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      const result = await dataAPI.deleteUserData('testUser', 'settings');
      expect(result).toBe(false);
      expect(console.error).toHaveBeenCalled();

      // Restore original implementation
      dataAPI.deleteUserData = originalDeleteUserData;
    });
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

// Import components
import { AppButton } from '../../components';
import { FormInput } from '../../components';
import { MenuItem } from '../../components';
import { SubMenuItem } from '../../components';
import { TabSelector } from '../../components';
import { AppLogo } from '../../components';

// Import utils
import { dataAPI } from '../../utils/dataAPI.js';
import { mockData } from '../../utils/mockDataSource.js';
import { screenRenderer } from '../../utils/screenRenderer.js';

// Import screens
import HomeScreen from '../../screens/HomeScreen.js';
import LoginScreen from '../../screens/LoginScreen.js';
import MainMenuScreen from '../../screens/MainMenuScreen.js';
import AccountSetupScreen from '../../screens/AccountSetupScreen.js';
import AboutScreen from '../../screens/AboutScreen.js';

describe('Component Tests', () => {
  test('AppButton renders correctly', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <AppButton title="Test Button" onPress={onPressMock} />
    );

    const button = getByText('Test Button');
    expect(button).toBeTruthy();

    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });

  test('FormInput renders correctly', () => {
    const onChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <FormInput 
        placeholder="Test Input"
        value="Test Value"
        onChangeText={onChangeMock}
      />
    );

    const input = getByPlaceholderText('Test Input');
    expect(input).toBeTruthy();
    expect(input.props.value).toBe('Test Value');

    fireEvent.changeText(input, 'New Value');
    expect(onChangeMock).toHaveBeenCalledWith('New Value');
  });

  test('MenuItem renders correctly', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <MenuItem 
        title="Test Menu Item"
        onPress={onPressMock}
        icon="test-icon"
      />
    );

    const menuItem = getByText('Test Menu Item');
    expect(menuItem).toBeTruthy();

    fireEvent.press(menuItem);
    expect(onPressMock).toHaveBeenCalled();
  });

  test('TabSelector renders correctly', () => {
    const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
    const onSelectMock = jest.fn();
    const { getByText } = render(
      <TabSelector 
        tabs={tabs}
        selectedIndex={0}
        onSelectTab={onSelectMock}
      />
    );

    tabs.forEach(tab => {
      expect(getByText(tab)).toBeTruthy();
    });

    fireEvent.press(getByText('Tab 2'));
    expect(onSelectMock).toHaveBeenCalledWith(1);
  });
});

describe('Utils Tests', () => {
  test('dataAPI.getData retrieves data correctly', async () => {
    const testKey = 'test.key';
    const result = await dataAPI.getData(testKey);
    expect(result).toEqual({ value: 'test-value' });
  });

  test('dataAPI.saveData saves data correctly', async () => {
    const testKey = 'test.save-key';
    const testData = { value: 'new-value' };
    const result = await dataAPI.saveData(testKey, testData);
    expect(result).toBe(true);

    const savedData = await dataAPI.getData(testKey);
    expect(savedData).toEqual(testData);
  });

  test('dataAPI.deleteData deletes data correctly', async () => {
    const testKey = 'test.delete-key';
    await dataAPI.saveData(testKey, { value: 'delete-me' });

    const result = await dataAPI.deleteData(testKey);
    expect(result).toBe(true);

    const deletedData = await dataAPI.getData(testKey);
    expect(deletedData).toBeNull();
  });

  test('screenRenderer renders screens correctly', () => {
    const mockProps = { test: 'value' };

    // Mock the screens object
    jest.mock('../../screens/index.js', () => ({
      screens: {
        home: jest.fn().mockReturnValue(<div>Home Screen</div>),
        login: jest.fn().mockReturnValue(<div>Login Screen</div>)
      }
    }));

    const result = screenRenderer.renderScreen('home', mockProps);
    expect(result).toBeTruthy();
  });
});

describe('Screen Tests', () => {
  test('HomeScreen renders correctly', () => {
    const navigateTo = jest.fn();
    const { getByText } = render(<HomeScreen navigateTo={navigateTo} />);
    expect(getByText(/welcome/i)).toBeTruthy();
  });

  test('LoginScreen renders correctly', () => {
    const navigateTo = jest.fn();
    const { getByText } = render(<LoginScreen navigateTo={navigateTo} />);
    expect(getByText(/login/i)).toBeTruthy();
  });

  test('MainMenuScreen renders correctly', () => {
    const navigateTo = jest.fn();
    const { getByText } = render(<MainMenuScreen navigateTo={navigateTo} />);
    expect(getByText(/main menu/i)).toBeTruthy();
  });

  test('AboutScreen renders correctly', () => {
    const navigateTo = jest.fn();
    const { getByText } = render(<AboutScreen navigateTo={navigateTo} />);
    expect(getByText(/about/i)).toBeTruthy();
  });
});

describe('Integration Tests', () => {
  test('App flow from login to main menu', async () => {
    // This is a placeholder for an integration test
    // In a real app, we would simulate user login flow
    expect(true).toBe(true);
  });
});