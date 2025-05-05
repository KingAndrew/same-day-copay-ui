import { dataAPI } from '../dataAPI.js.js.js.js.js';
import { mockData } from '../mockDataSource.js.js.js.js.js';

console.log('===== Running DataAPI Test =====');

async function testDataAPI() {
  // Test getData
  console.log('\nTesting dataAPI.getData...');
  const testKey = 'test.key';
  const testData = await dataAPI.getData(testKey);
  console.log(`Retrieved data for key '${testKey}':`, testData);

  if (testData && testData.value === 'test-value') {
    console.log('✅ dataAPI.getData is working correctly');
  } else {
    console.error('❌ dataAPI.getData is NOT working correctly');
    process.exit(1);
  }

  // Test saveData
  console.log('\nTesting dataAPI.saveData...');
  const saveKey = 'test.save-key';
  const saveData = { value: 'saved-value' };

  // Ensure the key doesn't exist before we start
  if (mockData[saveKey]) {
    delete mockData[saveKey];
    console.log(`Deleted test key '${saveKey}' for clean test`);
  }

  const saveResult = await dataAPI.saveData(saveKey, saveData);
  console.log(`Save operation result for key '${saveKey}':`, saveResult);

  // Verify data was saved
  const savedData = await dataAPI.getData(saveKey);
  console.log(`Retrieved saved data for key '${saveKey}':`, savedData);

  if (savedData && savedData.value === 'saved-value') {
    console.log('✅ dataAPI.saveData is working correctly');
  } else {
    console.error('❌ dataAPI.saveData is NOT working correctly');
    process.exit(1);
  }

  // Test deleteData
  console.log('\nTesting dataAPI.deleteData...');
  const deleteResult = await dataAPI.deleteData(saveKey);
  console.log(`Delete operation result for key '${saveKey}':`, deleteResult);

  // Verify data was deleted
  const deletedData = await dataAPI.getData(saveKey);
  console.log(`Retrieved data after deletion for key '${saveKey}':`, deletedData);

  if (!deletedData) {
    console.log('✅ dataAPI.deleteData is working correctly');
  } else {
    console.error('❌ dataAPI.deleteData is NOT working correctly');
    process.exit(1);
  }

  console.log('\n✅ All DataAPI tests passed!');
}

// Run the tests
testDataAPI().catch(error => {
  console.error('Error running DataAPI tests:', error);
  process.exit(1);
});