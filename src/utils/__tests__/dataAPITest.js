
/**
 * Tests for the dataAPI module
 */

const { dataAPI } = require('../dataAPI');

// Run a series of tests to verify dataAPI functionality
async function testDataAPI() {
  console.log('\n----- Starting DataAPI Tests -----\n');
  
  let allTestsPassed = true;
  
  // Test 1: Set simple data
  console.log('Test 1: Setting simple data...');
  const testKey = 'test.simple';
  const testValue = { name: 'Test User', age: 30 };
  
  try {
    const saveResult = await dataAPI.saveData(testKey, testValue);
    if (!saveResult) {
      console.log('❌ TEST FAILED: Could not save simple data');
      allTestsPassed = false;
    } else {
      console.log('✅ Successfully saved simple data');
    }
  } catch (error) {
    console.error('❌ TEST ERROR:', error);
    allTestsPassed = false;
  }
  
  // Test 2: Get simple data
  console.log('\nTest 2: Getting simple data...');
  try {
    const retrievedData = await dataAPI.getData(testKey);
    
    if (!retrievedData) {
      console.log('❌ TEST FAILED: Could not retrieve simple data');
      allTestsPassed = false;
    } else if (retrievedData.name !== testValue.name || retrievedData.age !== testValue.age) {
      console.log('❌ TEST FAILED: Retrieved data does not match saved data');
      console.log('Expected:', testValue);
      console.log('Retrieved:', retrievedData);
      allTestsPassed = false;
    } else {
      console.log('✅ Successfully retrieved simple data:', retrievedData);
    }
  } catch (error) {
    console.error('❌ TEST ERROR:', error);
    allTestsPassed = false;
  }
  
  // Test 3: Save nested data
  console.log('\nTest 3: Setting nested data...');
  const nestedKey = 'user.preferences.display';
  const nestedValue = { theme: 'dark', fontSize: 16 };
  
  try {
    const saveResult = await dataAPI.saveData(nestedKey, nestedValue);
    if (!saveResult) {
      console.log('❌ TEST FAILED: Could not save nested data');
      allTestsPassed = false;
    } else {
      console.log('✅ Successfully saved nested data');
    }
  } catch (error) {
    console.error('❌ TEST ERROR:', error);
    allTestsPassed = false;
  }
  
  // Test 4: Get nested data
  console.log('\nTest 4: Getting nested data...');
  try {
    const retrievedData = await dataAPI.getData(nestedKey);
    
    if (!retrievedData) {
      console.log('❌ TEST FAILED: Could not retrieve nested data');
      allTestsPassed = false;
    } else if (retrievedData.theme !== nestedValue.theme || retrievedData.fontSize !== nestedValue.fontSize) {
      console.log('❌ TEST FAILED: Retrieved nested data does not match saved data');
      console.log('Expected:', nestedValue);
      console.log('Retrieved:', retrievedData);
      allTestsPassed = false;
    } else {
      console.log('✅ Successfully retrieved nested data:', retrievedData);
    }
  } catch (error) {
    console.error('❌ TEST ERROR:', error);
    allTestsPassed = false;
  }
  
  // Test 5: Delete data
  console.log('\nTest 5: Deleting data...');
  try {
    const deleteResult = await dataAPI.deleteData(testKey);
    if (!deleteResult) {
      console.log('❌ TEST FAILED: Could not delete data');
      allTestsPassed = false;
    } else {
      console.log('✅ Successfully deleted data');
      
      // Verify the data is gone
      const checkDeleted = await dataAPI.getData(testKey);
      if (checkDeleted) {
        console.log('❌ TEST FAILED: Data still exists after deletion');
        allTestsPassed = false;
      } else {
        console.log('✅ Data confirmed deleted');
      }
    }
  } catch (error) {
    console.error('❌ TEST ERROR:', error);
    allTestsPassed = false;
  }
  
  // Final test report
  if (allTestsPassed) {
    console.log('\n✅ ALL TESTS PASSED - The dataAPI module is functioning correctly!');
    return true;
  } else {
    console.log('\n❌ SOME TESTS FAILED - The dataAPI module needs fixes!');
    return false;
  }
}

// Run the tests and exit with appropriate code
testDataAPI()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('\n❌ UNEXPECTED TEST ERROR:', error);
    process.exit(1);
  });
