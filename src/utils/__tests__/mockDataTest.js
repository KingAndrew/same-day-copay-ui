import mockData from '../mockDataSource.js';
import { dataAPI } from '../dataAPI.js';

console.log('===== Running Mock Data Source Test =====');
console.log('Testing mock data access...');

// Test if we can access the mock data directly
if (mockData.David && mockData.system) {
  console.log('✅ Mock data is accessible');
} else {
  console.error('❌ Mock data is not accessible');
  process.exit(1);
}

// Test if we can get data through the dataAPI
console.log('Testing dataAPI.getData with mock data...');
const testValue = await dataAPI.getData('test.key');

if (testValue && testValue.value === 'test-value') {
  console.log('✅ Successfully retrieved mock data through dataAPI');
} else {
  console.error('❌ Failed to retrieve mock data through dataAPI');
  process.exit(1);
}

// Test if we can save data through dataAPI
console.log('\n===== Testing dataAPI.saveData with mock data... =====\n');

console.log('Before save:');
console.log(`mockData['test.save-key'] = ${mockData['test.save-key']}`);

// Get initial keys to verify the save operation adds a new key
const initialKeys = Object.keys(mockData);
console.log('Initial mockData keys:', initialKeys);

// Delete test key if it exists, to ensure clean test
if ('test.save-key' in mockData) {
  delete mockData['test.save-key'];
  console.log('Deleted test key \'test.save-key\' for clean test');
}

console.log('\nCalling dataAPI.saveData...');
const saveResult = await dataAPI.saveData('test.save-key', { value: 'saved-value' });
console.log(`Save operation result: ${saveResult}\n`);

console.log('After save:');
console.log(`mockData['test.save-key'] = ${JSON.stringify(mockData['test.save-key'])}`);

// Get all keys after save
const afterSaveKeys = Object.keys(mockData);
console.log('Full mockData keys:', afterSaveKeys);

// Verify the save operation added the key successfully
if (mockData['test.save-key'] && mockData['test.save-key'].value === 'saved-value') {
  console.log('✅ Successfully saved data to mock source through dataAPI');
} else {
  console.error('❌ Failed to save data to mock source through dataAPI');
  process.exit(1);
}

console.log('\n✅ All mock data tests passed!');