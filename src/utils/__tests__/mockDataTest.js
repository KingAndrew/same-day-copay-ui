
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
    console.log('Testing dataAPI.saveData with mock data...');
    
    // Save data through API
    const saveResult = await dataAPI.saveData('test.save-key', { value: 'saved-value' });
    
    if (!saveResult) {
      console.error('❌ dataAPI.saveData returned false');
      return false;
    }
    
    // Verify data was saved to mock source
    if (mockData['test.save-key']?.value !== 'saved-value') {
      console.error('❌ Data was not properly saved to mock source');
      return false;
    }
    
    console.log('✅ Successfully saved data to mock source through dataAPI');
    return true;
  } catch (error) {
    console.error('❌ Error testing dataAPI.saveData:', error);
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
