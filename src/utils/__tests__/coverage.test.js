
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
