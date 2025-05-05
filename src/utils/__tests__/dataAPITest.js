import { dataAPI } from '../dataAPI.js';

console.log('\n----- Starting DataAPI Tests -----\n');

// Test 1: Save simple data
async function testSetSimpleData() {
  console.log('Test 1: Setting simple data...');
  const result = await dataAPI.saveData('test.simple', { name: 'Test User', age: 30 });

  if (result) {
    console.log('✅ Successfully saved simple data');
  } else {
    console.log('❌ Failed to save simple data');
    process.exit(1);
  }
}

// Test 2: Retrieve simple data
async function testGetSimpleData() {
  console.log('\nTest 2: Getting simple data...');
  const data = await dataAPI.getData('test.simple');

  if (data && data.name === 'Test User' && data.age === 30) {
    console.log('✅ Successfully retrieved simple data:', data);
  } else {
    console.log('❌ Failed to retrieve simple data or data is incorrect');
    process.exit(1);
  }
}

// Test 3: Save nested data
async function testSetNestedData() {
  console.log('\nTest 3: Setting nested data...');
  const result = await dataAPI.saveData('user.preferences.display', { theme: 'dark', fontSize: 16 });

  if (result) {
    console.log('✅ Successfully saved nested data');
  } else {
    console.log('❌ Failed to save nested data');
    process.exit(1);
  }
}

// Test 4: Retrieve nested data
async function testGetNestedData() {
  console.log('\nTest 4: Getting nested data...');
  const data = await dataAPI.getData('user.preferences.display');

  if (data && data.theme === 'dark' && data.fontSize === 16) {
    console.log('✅ Successfully retrieved nested data:', data);
  } else {
    console.log('❌ Failed to retrieve nested data or data is incorrect');
    process.exit(1);
  }
}

// Test 5: Delete data
async function testDeleteData() {
  console.log('\nTest 5: Deleting data...');
  const result = await dataAPI.deleteData('test.simple');

  if (result) {
    console.log('✅ Successfully deleted data');
  } else {
    console.log('❌ Failed to delete data');
    process.exit(1);
  }

  const data = await dataAPI.getData('test.simple');
  if (data === null) {
    console.log('✅ Data confirmed deleted');
  } else {
    console.log('❌ Data still exists after deletion');
    process.exit(1);
  }
}

// Run all tests in sequence
async function runTests() {
  try {
    await testSetSimpleData();
    await testGetSimpleData();
    await testSetNestedData();
    await testGetNestedData();
    await testDeleteData();

    console.log('\n✅ ALL TESTS PASSED - The dataAPI module is functioning correctly!');
  } catch (error) {
    console.error('❌ TEST FAILURE:', error);
    process.exit(1);
  }
}

// Execute tests
runTests();