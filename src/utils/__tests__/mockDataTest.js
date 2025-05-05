
// Mock Data Test - This tests the mock data functionality and dataAPI integration

const { dataAPI } = require('../dataAPI');
const mockData = require('../mockDataSource');

console.log('===== Running Mock Data Source Test =====');

// Test mock data is accessible
function testMockDataAccess() {
  try {
    console.log('Testing mock data access...');
    
    // Test if mockData is properly initialized
    if (!mockData || typeof mockData !== 'object') {
      console.error('❌ Mock data is not properly initialized');
      return false;
    }
    
    console.log('✅ Mock data is accessible');
    return true;
  } catch (error) {
    console.error('❌ Error testing mock data access:', error);
    return false;
  }
}

// Test dataAPI can retrieve mock data
async function testDataAPIGetMockData() {
  try {
    console.log('Testing dataAPI.getData with mock data...');
    
    // Add test data to mock data source
    mockData['test.key'] = { value: 'test-value' };
    
    // Test retrieval
    const data = await dataAPI.getData('test.key');
    
    if (!data || data.value !== 'test-value') {
      console.error('❌ Failed to retrieve mock data through dataAPI');
      console.error('Expected: { value: "test-value" }, Got:', data);
      return false;
    }
    
    console.log('✅ Successfully retrieved mock data through dataAPI');
    return true;
  } catch (error) {
    console.error('❌ Error testing dataAPI.getData:', error);
    return false;
  }
}

// Test dataAPI can save to mock data
async function testDataAPISaveMockData() {
  try {
    console.log('\n===== Testing dataAPI.saveData with mock data... =====');
    
    // Save data through API
    const testKey = 'test.save-key';
    const testValue = { value: 'saved-value' };
    
    // Show initial state
    console.log('\nBefore save:');
    console.log(`mockData['${testKey}'] =`, mockData[testKey]);
    console.log('Initial mockData keys:', Object.keys(mockData));
    
    // Clear any existing data with this key to ensure clean test
    delete mockData[testKey];
    console.log(`Deleted test key '${testKey}' for clean test`);
    
    console.log('\nCalling dataAPI.saveData...');
    const saveResult = await dataAPI.saveData(testKey, testValue);
    
    // Show result of save operation
    console.log('Save operation result:', saveResult);
    
    // Show the mockData state after saving
    console.log('\nAfter save:');
    console.log(`mockData['${testKey}'] =`, mockData[testKey]);
    console.log('Full mockData keys:', Object.keys(mockData));
    
    if (!saveResult) {
      console.error('❌ dataAPI.saveData returned false');
      return false;
    }
    
    // Verify data was saved to mock source
    if (!mockData[testKey]) {
      console.error('❌ Data was not found in mock source');
      console.error('Expected mockData to have key:', testKey);
      console.error('Available keys:', Object.keys(mockData));
      return false;
    }
    
    if (mockData[testKey].value !== 'saved-value') {
      console.error('❌ Data value is incorrect in mock source');
      console.error('Expected value:', 'saved-value');
      console.error('Actual value:', mockData[testKey].value);
      return false;
    }
    
    console.log('✅ Successfully saved data to mock source through dataAPI');
    return true;
  } catch (error) {
    console.error('❌ Error testing dataAPI.saveData:', error);
    console.error(error.stack);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  const results = [
    testMockDataAccess(),
    await testDataAPIGetMockData(),
    await testDataAPISaveMockData()
  ];
  
  const allPassed = results.every(result => result === true);
  
  if (allPassed) {
    console.log('\n✅ All mock data tests passed!');
    process.exit(0); // Success exit code
  } else {
    console.error('\n❌ Some mock data tests failed');
    process.exit(1); // Failure exit code
  }
}

// Execute tests
runAllTests();
