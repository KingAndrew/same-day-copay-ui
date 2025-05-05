
import { mockData } from '../mockDataSource.js.js.js.js.js';
import { dataAPI } from '../dataAPI.js.js.js.js.js';

console.log('===== Running Mock Data Source Test =====');

// Test direct access to mock data
console.log('Testing mock data access...');
if (mockData && Object.keys(mockData).length > 0) {
  console.log('✅ Mock data is accessible');
} else {
  console.error('❌ Cannot access mock data');
  process.exit(1);
}

// Test dataAPI.getData with mock data
console.log('Testing dataAPI.getData with mock data...');
const testKey = 'test.key';
const testData = await dataAPI.getData(testKey);
console.log(`Direct key access for '${testKey}':`, testData);

if (testData && testData.value === 'test-value') {
  console.log('✅ Successfully retrieved mock data through dataAPI');
} else {
  console.error('❌ Failed to retrieve mock data through dataAPI');
  process.exit(1);
}

// Test dataAPI.saveData with mock data
console.log('\n===== Testing dataAPI.saveData with mock data... =====\n');
const saveKey = 'test.save-key';

console.log('Before save:');
console.log(`mockData['${saveKey}'] =`, mockData[saveKey]);
console.log('Initial mockData keys:', Object.keys(mockData));

// Ensure the test key doesn't exist before we start
if (mockData[saveKey]) {
  delete mockData[saveKey];
  console.log(`Deleted test key '${saveKey}' for clean test`);
}

console.log('\nCalling dataAPI.saveData...');
const saveData = { value: 'saved-value' };
const saveResult = await dataAPI.saveData(saveKey, saveData);
console.log(`Saved data for key '${saveKey}':`, saveData);
console.log('Save operation result:', saveResult);

console.log('\nAfter save:');
console.log(`mockData['${saveKey}'] =`, mockData[saveKey]);
console.log('Full mockData keys:', Object.keys(mockData));

if (mockData[saveKey] && mockData[saveKey].value === 'saved-value') {
  console.log('✅ Successfully saved data to mock source through dataAPI');
} else {
  console.error('❌ Failed to save data to mock source through dataAPI');
  process.exit(1);
}

console.log('\n✅ All mock data tests passed!');
